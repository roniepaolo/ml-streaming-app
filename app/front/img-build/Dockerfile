ARG ALPINE_VERSION
ARG NODE_VERSION

from node:${NODE_VERSION}-alpine${ALPINE_VERSION}

ENV NODE_APP_DIR=/app

COPY ./package*.json ${NODE_APP_DIR}/
COPY ./.env ${NODE_APP_DIR}/
COPY ./src ${NODE_APP_DIR}/src
COPY ./public ${NODE_APP_DIR}/public

WORKDIR ${NODE_APP_DIR}

RUN npm install

CMD ["npm", "start"]
