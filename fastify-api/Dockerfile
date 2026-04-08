FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3015

CMD ["sh", "-c", "node src/server.js & node src/workers/checkout.worker.js"]