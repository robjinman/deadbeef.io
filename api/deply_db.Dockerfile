FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
COPY package-lock.json ./
COPY .env ./
COPY prisma ./prisma
RUN npm install
CMD ["npx", "prisma", "migrate", "deploy"]
