FROM php:8.2-cli
WORKDIR /var/www/html
CMD ["php", "-S", "0.0.0.0:8000", "-t", "."]
EXPOSE 8000