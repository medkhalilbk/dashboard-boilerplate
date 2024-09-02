FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm i -g prisma

COPY . .

EXPOSE 3000

CMD ["npm", "start:prod"]
