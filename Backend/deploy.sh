#!/bin/sh

# Run this script as sudoer.

##########################################
# Settings:

# Name must be lowercase:
IMAGE_NAME=bornetogo-backend

# In production, :latest should not be used.
IMAGE_VERSION=1.0

# Visible port from which the container will be reachable:
HOST_PORT=4321

# Better not modify this:
CONTAINER_PORT=8080

# For the container to be removed upon exit, use the --rm flag.
# Alternatively, automatic restart policies can be set by using
# the --restart flag, with one of the following options:
# no, on-failure, always, unless-stopped.
LIFETIME='--restart on-failure'

# To be able to access the container via bash:
INTERACTIVE=-it

# Run the container in the background.
# Comment this for debugging purposes:
DETACHED=-d

# Used for cleaning unused images:
ENABLE_DANGLING_CLEANING=true

# Directory containing compilation results,
# only used to check if the container must be run:
TARGET_DIR=target

##########################################
# Deployment:

if [ ! -d "$TARGET_DIR" ]; then
	printf "\n-> Could not launch the project: compile it first.\n\n"
	exit 1
fi

ERROR_MESSAGE="\n-> Are you sure docker is installed, and this script is run as sudoer?\n\n"

PREVIOUS_INSTANCES=$(docker ps -q --filter name=$IMAGE_NAME) || { printf "$ERROR_MESSAGE"; exit 1; }

if [ ! "$PREVIOUS_INSTANCES" = "" ]; then # do not check the version!
	printf "\n-> Removing any previous instance of the container:\n\n"
	docker rm -f $PREVIOUS_INSTANCES
fi

printf "\n-> Building the new image:\n\n"
docker build -t $IMAGE_NAME:$IMAGE_VERSION .

DANGLING_IMAGES=$(docker images -q --filter "dangling=true" --no-trunc)

if [ $ENABLE_DANGLING_CLEANING = true -a "$DANGLING_IMAGES" != "" ]; then
	printf "\n-> Removing dangling images:\n\n"
	docker rmi -f $DANGLING_IMAGES
fi

printf "\n-> Running the new container:\n\n"
docker run $LIFETIME $INTERACTIVE $DETACHED -p $HOST_PORT:$CONTAINER_PORT --name $IMAGE_NAME $IMAGE_NAME:$IMAGE_VERSION

if [ ''$DETACHED = -d ]; then
	CONTAINER_ID=$(docker ps -aqf "name=$IMAGE_NAME")
	printf "\n-> Container '$IMAGE_NAME:$IMAGE_VERSION' (id = $CONTAINER_ID) is running.\n\n"
fi

exit 0
