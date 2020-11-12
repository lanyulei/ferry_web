FROM node:14.15.0

WORKDIR /opt/ferry_web
COPY . .

RUN npm config set registry "https://registry.npm.taobao.org/" && npm install
RUN npm run build:prod

FROM nginx:1.18.0

#暴露容器8001端口
EXPOSE 8001