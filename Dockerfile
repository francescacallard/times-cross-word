FROM node:20-alpine as buildenv

WORKDIR /app

ARG TARGET_ENV=dev

COPY package.json yarn.lock tsconfig.json ./
COPY public/ ./public
COPY src/ ./src

RUN yarn --frozen-lockfile && \
    yarn build && \
    rm -rf src/

FROM nginxinc/nginx-unprivileged:1.25-alpine AS production
WORKDIR /app

ARG TARGET_ENV=dev

RUN rm -rf /etc/nginx/conf.d

COPY ./config-nginx/conf-${TARGET_ENV}/ /etc/nginx
COPY --from=buildenv /app/build /usr/share/nginx/html

USER root

RUN addgroup -S customgroup && adduser -D -S dockeruser -G customgroup && \
    chown -R dockeruser:customgroup /usr/share/nginx

USER dockeruser

EXPOSE 8080

HEALTHCHECK CMD curl --fail http://localhost:8080 || exit 1

CMD ["nginx","-g","daemon off;"]
