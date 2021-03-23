FROM node:12.16.3-alpine3.9

WORKDIR /app
COPY ./app/auth/package.json ./
RUN npm install --only=prod
COPY ./app/auth/ ./
COPY ./common/ ./common
CMD ["npm", "start"]