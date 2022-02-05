FROM node:16-alpine
WORKDIR /home/node
ARG BUILD_TYPE
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY angular.json ./
COPY .browserslistrc ./
COPY src ./src
RUN npm install
RUN npm run build-${BUILD_TYPE:-staging}

FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /var/www/html
EXPOSE 80/tcp
CMD ["apachectl", "-D", "FOREGROUND"]
RUN apt update && \
    apt install -y apache2 \ 
        curl && \
    rm -rf /var/lib/apt/lists/*
RUN a2enmod rewrite
COPY 000-default.conf /etc/apache2/sites-enabled/
COPY --from=0 /home/node/dist/deadbeefio/ .
