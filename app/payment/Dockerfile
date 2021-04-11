FROM node:12.16.3-alpine3.9

WORKDIR /app
COPY ./app/payment/package.json ./
RUN npm install --silent --only=prod
COPY ./app/payment/ ./
COPY ./common/ ./common
CMD ["npm", "start"]