FROM node:10
COPY package*.json /app/
WORKDIR /app
RUN npm install

COPY ./ /app

RUN npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
