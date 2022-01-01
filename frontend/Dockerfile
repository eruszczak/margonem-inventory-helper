FROM node:10-alpine
COPY package*.json /app/
WORKDIR /app
RUN apk add --no-cache python make g++
RUN npm install

COPY ./ /app

RUN npm run build

FROM nginx:stable-alpine
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
