#!/bin/sh

# Filling script.

# Start the filling:
# time sudo sh fill.sh

# To access the database from CLI with MySQL client:
# mysql -h localhost -P 3456 --protocol=tcp -u root -p

# To check on the port:
# sudo ss -tulpn | grep :3456


# # This can be used with: mysql --defaults-extra-file=$SECRET ...
# SECRET="./secret.cnf"
# if [ ! -e $SECRET ]; then
# 	printf "Secret file not found.\n"
# 	exit 1
# fi

USER=root
PASSWORD=aaa

# Location of .sql scripts *inside* the container:
SCRIPTS_DIR=/tmp/sql-scripts

CONTAINER_NAME=bornetogo-database
CONTAINER_ID=$(docker ps -aq --filter name=$CONTAINER_NAME)

importFile()
{
	printf "Importing: $1\n"
	docker exec $CONTAINER_ID /bin/sh -c "mysql -u $USER -p$PASSWORD < $SCRIPTS_DIR/$1"
}

# Tables need to be loaded in a correct order:
importFile tables.sql
importFile paiement.sql
importFile status.sql
importFile connecteur.sql
importFile courant.sql
importFile batterie.sql
importFile voiture.sql
importFile vcc.sql
importFile station.sql
importFile borne.sql
importFile stationBorne.sql
