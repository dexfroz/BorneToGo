#!/bin/sh

# The goal of this script is to build and test the project, without the REST API.
# Args can be passed, e.g by running: sh build.sh foo bar


# Build:

mvn clean install

BUILD_STATUS=$?
if [ $BUILD_STATUS -ne 0 ]; then
	exit 1
fi


# Runtime, method 1 - java only:

# java -jar target/bornetogo-backend-1.0-SNAPSHOT-classes.jar $@


# Runtime, method 2 - with maven:

JAVA_PROGRAM_ARGS=`echo "$@"`
mvn exec:java -Dexec.args="$JAVA_PROGRAM_ARGS"
