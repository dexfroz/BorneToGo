#!/bin/sh

# Note: this script may fail the first time it is run...
# Use what's below for not breaking:
# time sh fill.sh

# To check on the port:
# sudo ss -tulpn | grep :3306

# To test directly:
# mysql -h 127.0.0.1 -P 3306 --protocol=tcp -u root -p

# Right thing? Maybe:
# sudo chown 644:644 .
# sudo chown mysql:mysql .

# --env="MYSQL_ROOT_PASSWORD=aaa"


SECRET="./secret.cnf"
TABLES="./tables.sql"
SCRIPTS_DIR="./sql-scripts/"

#IP=localhost
IP="127.0.0.1" # localhost caused an issue...
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
	mysql --defaults-extra-file=$SECRET -h $IP -P $PORT $PROTOCOL < $1
}

##########################################

# BIG_FILE="./bigScript.sql" # ok
BIG_FILE="./newBigScript.sql"

importFile $BIG_FILE

##########################################
# Does not work as of now:

# importFile $TABLES

# importFile "$SCRIPTS_DIR"paiement.sql
# importFile "$SCRIPTS_DIR"status.sql
# importFile "$SCRIPTS_DIR"connecteur.sql
# importFile "$SCRIPTS_DIR"courant.sql
# importFile "$SCRIPTS_DIR"batterie.sql
# importFile "$SCRIPTS_DIR"station.sql
# importFile "$SCRIPTS_DIR"borne.sql
# importFile "$SCRIPTS_DIR"voiture.sql
# importFile "$SCRIPTS_DIR"vcc.sql

##########################################
# Does not work as of now:

# importFile $TABLES

# for FILE in $(ls "$SCRIPTS_DIR"*.sql); do
# 	echo $FILE
# 	# Cleanup:
# 	# sed -i "s/'None'/NULL/g" $FILE
# 	# sed -i "s/'True'/TRUE/g" $FILE
# 	# sed -i "s/'False'/FALSE/g" $FILE
# 	importFile $FILE
# done

exit 0
