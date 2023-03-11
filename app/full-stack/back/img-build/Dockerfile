ARG ALPINE_VERSION
ARG NODE_VERSION

from node:${NODE_VERSION}-alpine${ALPINE_VERSION}

ENV NODE_APP_DIR=/app

COPY ./back/package*.json ${NODE_APP_DIR}/
COPY ./back/src ${NODE_APP_DIR}/src

WORKDIR ${NODE_APP_DIR}

RUN npm install

CMD ["npm", "start"]
