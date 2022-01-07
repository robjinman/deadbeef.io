FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /var/www/html
EXPOSE 80/tcp
CMD ["apachectl", "-D", "FOREGROUND"]

RUN apt update && \
    apt install -y apache2 \ 
        php \
        libapache2-mod-php \
        php-pear \
        curl && \
    rm -rf /var/lib/apt/lists/*

RUN pear channel-discover pear.nrk.io
RUN pear install nrk/Predis

COPY app/ /var/www/html/

