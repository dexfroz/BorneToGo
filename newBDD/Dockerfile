# Derived from official mysql image (our base image)
FROM mysql:8.0

EXPOSE 3306

# COPY ./BDDScript/BDDScript3.sql ./var/lib/mysql



# VOLUME .data/ /var/lib/mysql/

# Add a database
# ENV MYSQL_DATABASE BorneToGo

# Working directory for the following instructions:
# WORKDIR /docker-entrypoint-initdb.d/

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
# COPY ./sql-scripts/ .
# COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

# # Automatic database creation - FAILED.
# COPY sh ./deploy.sh .
# RUN sh ./deploy.sh

# For checking on things, enter with:
# sudo docker exec -it <mycontainer> bash

# Define a volume here instead of inside docker-compose?


# ENV MYSQL_ROOT_PASSWORD=123
# ENV MYSQL_DATABASE=BorneToGo

# Create Database
# RUN	mkdir /usr/sql
# RUN	chmod 644 /usr/sql

# COPY ["sql-scripts", "/var/lib/mysql"]

# Define mountable directories.
# VOLUME ["./.data", "/var/lib/mysql"]

# COPY sql-scripts .

# COPY ["BDDScript/BDDScript3.sql", "/var/lib/mysql"]


# sudo docker build -t mydb:1.0 .
# sudo docker run --rm -it -d -p 3306:8080 --name mydb mydb:1.0
# # sudo docker run --rm -it -d -p 3306:8080 -e MYSQL_ROOT_PASSWORD=123 --name mydb mydb:1.0
# sudo docker exec -it mydb mysql -uroot -p

