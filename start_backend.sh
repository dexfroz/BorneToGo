#!/bin/sh

# Settings:

CONTAINER_NAME=bornetogo-backend

# Comment this for debugging purpose:
DETACH_OPTION=-d


# Build phase:

printf '\n-> Building the project:\n\n'
mvn clean install

BUILD_STATUS=$?
if [ $BUILD_STATUS -ne 0 ]; then
	printf "\n-> Build failed! Not launching/restarting the docker container.\n\n"
	exit 1
fi


# Deployment:

printf '\n-> Removing any previous instance of the container:\n\n'
sudo docker rm -f $CONTAINER_NAME

printf '\n-> Building the new container:\n\n'
sudo docker build -t $CONTAINER_NAME .

printf '\n-> Removing untagged images:\n\n'
sudo docker rmi $(sudo docker images -q --filter "dangling=true" --no-trunc)

printf '\n-> Running the new container:\n\n'
sudo docker run --rm $DETACH_OPTION --name $CONTAINER_NAME -it -p 8080:8080 $CONTAINER_NAME:latest


if [ ''$DETACH_OPTION = -d ]; then
	CONTAINER_ID=$(sudo docker ps -aqf "name=$CONTAINER_NAME")
	printf "\n-> Container '$CONTAINER_NAME' (id = $CONTAINER_ID) is running.\n\n"
fi

exit 0
