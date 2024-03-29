FROM node:14.15.5

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

CMD [ "npm", "start" ]

