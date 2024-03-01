FROM node:lts-alpine as build-stage   

WORKDIR /app

COPY package*.json ./  

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn","dev"]