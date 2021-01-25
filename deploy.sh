#!/bin/sh

# Run this script as sudoer.

# Settings:

# Name must be lowercase:
CONTAINER_NAME=bornetogo-backend

# Exposing the given range of ports,
# must be in accordance with the Dockerfile.
PORTS=8080:8080

# Used for cleaning unused images:
ENABLE_DANGLING_CLEANING=true

# Comment this for debugging purposes:
DETACH_OPTION=-d

# Directory containing compilation results:
TARGET_DIR=target


# Deployment:

if [ ! -d "$TARGET_DIR" ]; then
	printf "\n-> Could not launch the project: compile it first.\n\n"
	exit 1
fi

if [ ! $(docker ps -q --filter ancestor=$CONTAINER_NAME) = "" ]; then
	printf "\n-> Removing any previous instance of the container:\n\n"
	docker rm -f $CONTAINER_NAME
fi

printf "\n-> Building the new container:\n\n"
docker build -t $CONTAINER_NAME .

DANGLING_IMAGES=$(docker images -q --filter "dangling=true" --no-trunc)

if [ $ENABLE_DANGLING_CLEANING = true -a "$DANGLING_IMAGES" != "" ]; then
	printf "\n-> Removing dangling images:\n\n"
	docker rmi -f $DANGLING_IMAGES
fi

printf "\n-> Running the new container:\n\n"
docker run --rm $DETACH_OPTION --name $CONTAINER_NAME -it -p $PORTS $CONTAINER_NAME:latest

if [ ''$DETACH_OPTION = -d ]; then
	CONTAINER_ID=$(docker ps -aqf "name=$CONTAINER_NAME")
	printf "\n-> Container '$CONTAINER_NAME' (id = $CONTAINER_ID) is running.\n\n"
fi

exit 0
