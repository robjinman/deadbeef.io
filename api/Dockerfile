FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build

FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma
COPY .env ./
RUN npm install --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
EXPOSE 4000
CMD ["pm2-runtime","app.js"]
