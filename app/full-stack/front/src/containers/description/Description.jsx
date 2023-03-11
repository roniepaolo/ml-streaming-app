import React from 'react';
import Feature from '../../components/feature/Feature';
import './description.css';

const Description = () => (
  <div className="churn__whatchurn section__margin" id="howdoesitwork">
    <div className="churn__whatchurn-feature">
      <Feature title="How does it work?" text="Data submitted by the user is inserted into a Postgres table that is connected to the Kafka cluster through a Debezium connector. The process listening to the source topic, receives the input and make a request to a pre-trained ML model, producing the prediction to a sink topic. At the end, a Postgres table ingested by a JDBC connector is exposed through the full-stack app to the user" />
    </div>
    <div className="churn__whatchurn-heading">
      <h1 className="gradient__text">Main features of the project</h1>
    </div>
    <div className="churn__whatchurn-container">
      <Feature title="AWS" text="The project was built in AWS infrastructure using EC2 instances, IaaS approach" />
      <Feature title="Terraform" text="All the resources are built with one command and in few seconds using Terraform and its AWS provider" />
      <Feature title="Ansible" text="Instances, disk mounts and necessary packages are configured in seconds with Ansible" />
      <Feature title="Docker" text="All services are containerized, based in Alpine images and deployed using Docker Compose" />
      <Feature title="Postgres" text="It is an open source data base that is optimized for sophisticated data and fits in several use cases" />
      <Feature title="Kafka" text="Data streaming is managed and stored in a Kafka (KRaft) cluster of 3 brokers for high reliability" />
      <Feature title="Debezium" text="Allows the connection between multiple data bases and Kafka for Change Data Capture (CDC)" />
      <Feature title="Schema Registry" text="It is used to store AVRO data schemas of topics. AVRO serialization was used for high performance and efficient storage" />
      <Feature title="BentoML" text="It is the faster way to server a ML model to production and it is integrated with the MLOps ecosystem. FastAPI is a thing of the past" />
      <Feature title="Python, Bash and YAML" text="All the scripts and configuration files were coded using Python, Bash and YAML languages" />
    </div>
  </div>
);

export default Description;