FROM node:slim

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

# CMD ["npm", "start"]
