ARG ALPINE_VERSION
ARG PYTHON_VERSION

FROM python:${PYTHON_VERSION}-alpine${ALPINE_VERSION}

ENV PYTHON_APP_DIR=/app

COPY requirements.txt .

RUN set -eux; \
    \
    apk add --no-cache gcc musl-dev; \
    apk add --no-cache \
        librdkafka-dev=2.0.2-r0 \
        --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community; \
    pip install --no-cache-dir -r requirements.txt;

COPY ./src/*.py ${PYTHON_APP_DIR}/
COPY ./img-build/docker-entrypoint.sh /

WORKDIR ${PYTHON_APP_DIR}

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["python3", "main.py"]
