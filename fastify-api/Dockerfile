FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3015

CMD ["sh", "-c", "node src/cluster.js & node src/workers/checkout.worker.js"]