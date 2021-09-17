FROM node:lts-apline@sha256:d339c269a72f04c7ca6247eb09a0038f1927324c5c2518aeb8f37369a6560ead

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR /app
RUN mkdir ./queryengine && chown -R node:node ./queryengine

WORKDIR /app/queryengine
COPY package.json ./

USER node

RUN yarn install --production
COPY --chown=node:node . .

ENV MONGODB_URL mongodb://local-mongodb:27017/school

ENTRYPOINT yarn start