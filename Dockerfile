FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm i -g prisma
COPY . . 
EXPOSE 3000
COPY ./env/.env .env
CMD ["npm", "run", "start:prod"]
