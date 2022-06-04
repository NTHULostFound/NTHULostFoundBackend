FROM node:18-alpine
ENV PORT 3000

WORKDIR /app
COPY ./package.json ./yarn.lock /app/

RUN yarn install

COPY ./ /app/

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/graphql || exit 1

EXPOSE ${PORT}
CMD [ "yarn", "start" ]