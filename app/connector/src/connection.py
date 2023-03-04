import configparser
import requests
from pathlib import Path
from confluent_kafka import Consumer
from confluent_kafka import Producer
from confluent_kafka.schema_registry import SchemaRegistryClient
from confluent_kafka.schema_registry.avro import AvroDeserializer
from confluent_kafka.schema_registry.avro import AvroSerializer
from confluent_kafka.serialization import SerializationContext, MessageField


class KafkaAPI:
    def __init__(self):
        self.conf = configparser.ConfigParser()
        self.conf.read(Path("conf.properties"))
        self.source_topic = self.conf["TOPIC"]["source.topic.name"]
        self.sink_topic = self.conf["TOPIC"]["sink.topic.name"]
        self.sr_conf = {
            "url": self.conf["SCHEMA_REGISTRY"]["url"]
        }
        self.cc_conf = {
            "bootstrap.servers": self.conf["CONSUMER"]["bootstrap.servers"],
            "group.id": self.conf["CONSUMER"]["group.id"],
            "auto.offset.reset": self.conf["CONSUMER"]["auto.offset.reset"]
        }
        self.cp_conf = {
            "bootstrap.servers": self.conf["CONSUMER"]["bootstrap.servers"]
        }
        self.sr_client = SchemaRegistryClient(self.sr_conf)
        self.endpoint = self.conf["BENTO"]["endpoint"]

    def get_schemas(self, key_subject, value_subject):
        key_schema = \
            self.sr_client.get_latest_version(key_subject).schema.schema_str
        value_schema = \
            self.sr_client.get_latest_version(value_subject).schema.schema_str
        return key_schema, value_schema

    def process(self):
        # Consumer
        source_schemas = self.get_schemas(f"{self.source_topic}-key", f"{self.source_topic}-value")
        value_deserializer = AvroDeserializer(self.sr_client, source_schemas[1])
        cc_client = Consumer(self.cc_conf)
        cc_client.subscribe([self.source_topic])

        # Producer
        sink_schemas = self.get_schemas(f"{self.sink_topic}-key", f"{self.sink_topic}-value")
        key_serializer = AvroSerializer(self.sr_client, sink_schemas[0])
        value_serializer = AvroSerializer(self.sr_client, sink_schemas[1])
        cp_client = Producer(self.cp_conf)

        while True:
            # Consume input data
            msg = cc_client.poll(1.0)
            if msg is None:
                continue
            value_dict = value_deserializer(msg.value(), SerializationContext(msg.topic(), MessageField.VALUE))
            new_row = value_dict["after"]

            # Request prediction
            r = requests.post(self.endpoint, json=new_row)

            # Produce prediction
            pred_key = {"customerid": r.json().get("customerid")}
            pred_value = r.json()
            cp_client.produce(
                topic=self.sink_topic,
                key=key_serializer(pred_key, SerializationContext(self.sink_topic, MessageField.KEY)),
                value=value_serializer(pred_value, SerializationContext(self.sink_topic, MessageField.VALUE))
            )
            cp_client.flush()
            # Maintain break for tests
            # break
        cc_client.close()
