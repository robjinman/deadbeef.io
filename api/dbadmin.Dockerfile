FROM node:16-alpine
WORKDIR /home/node
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY .env ./
RUN npm install
ENTRYPOINT ["tail", "-f", "/dev/null"]
