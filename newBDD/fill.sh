#!/bin/sh

# Filling script.

# Note: this script may fail the first time it is run...
# Use what's below for not breaking:
# time sh fill.sh

# To access the database from CLI:
# mysql -h 127.0.0.1 -P 3306 --protocol=tcp -u root -p

# To check on the port:
# sudo ss -tulpn | grep :3306


SECRET="./secret.cnf"
SCRIPTS_DIR="./sql-scripts/"

IP=localhost
# IP="127.0.0.1" # if localhost fails...
#IP="0.0.0.0"

PORT=3306
PROTOCOL="--protocol=tcp"

if [ ! -e $SECRET ]; then
	printf "Secret file not found.\n"
	exit 1
fi

importFile()
{
	printf "Importing: $1\n"
	mysql --defaults-extra-file=$SECRET -h $IP -P $PORT $PROTOCOL < ${SCRIPTS_DIR}$1
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

exit 0
