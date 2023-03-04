from connection import KafkaAPI


def main():
    k = KafkaAPI()
    k.process()


if __name__ == "__main__":
    main()
