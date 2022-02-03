FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /var/www/html
EXPOSE 80/tcp
CMD ["apachectl", "-D", "FOREGROUND"]

RUN apt update && \
    apt install -y apache2 \ 
        curl && \
    rm -rf /var/lib/apt/lists/*

COPY dist/deadbeefio/ /var/www/html/
