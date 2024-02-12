# Use a slim version of Node.js
FROM node:14-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "start"]

# Production
FROM node:lts-buster as build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g npm
RUN npm install --production
RUN npm run build

FROM nginx:latest as production
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
