FROM node:14.15.0 as builder

WORKDIR /opt/ferry_web
COPY . .

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install
RUN npm run build:prod

FROM nginx:1.18.0

COPY --from=builder /opt/ferry_web/web /opt/web
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/entrypoint.sh /entrypoint.sh

ENV LISTEN_DOMAIN=fdevops.com

#暴露容器8001端口
EXPOSE 8001
ENTRYPOINT [ "/entrypoint.sh" ]