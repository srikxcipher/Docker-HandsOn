FROM mysql:8.0

# Environment variables for root and database
ENV MYSQL_ROOT_PASSWORD=pass123
ENV MYSQL_DATABASE=hands_on

# Copy init script to container’s init directory
COPY init.sql /docker-entrypoint-initdb.d/
