# BorneToGo backend

Backend for the BorneToGo ISEN's project, an app whose purpose is to help finding where to charge electric cars.

For now, is only implemented a REST API enabling GET and POST requests to a java project. It uses the docker image Payara Micro, and Jakarta EE.

Forked from: <https://github.com/Carath/payara-micro-test>


## Installation (Linux)

Install docker, java 1.8 (jdk + jre), and maven 3.6.3. Don't forget to export the JAVA_HOME and M2_HOME environment variables, and if under a proxy to properly setup the setting.xml file, which must be placed in the ```~/.m2``` directory.

Download the Payara Micro docker image, found at <https://hub.docker.com/r/payara/micro>, by running:

```
sudo docker pull payara/micro
```


## Runtime:

Start the docker process with: ```sudo systemctl start docker```

Then run as sudoer: ```sh start_backend.sh ```

To test GET requests, simply go to the following links from a web browser:

```
http://localhost:8080/bornetogo/backend
http://localhost:8080/bornetogo/backend/get/123
```

This may alternatively be done using curl:

```
curl -w '\n' http://localhost:8080/bornetogo/backend
curl -w '\n' http://localhost:8080/bornetogo/backend/get/123
```

For POST requests:

```
curl -w '\n' -X POST --data 'This is my request.' http://localhost:8080/bornetogo/backend/post
```

The type of content to be POSTed may also be specified, e.g by adding ```-H 'Content-Type: text/plain'``` before the url.


## Deployment:

Once the project is done, and needs to be deployed e.g on a server, java and maven need not to be reinstalled there again! Indeed, the docker image contains a java JRE. Therefore, the only files necessary for this to run are:

- This README
- Dockerfile
- target/bornetogo-backend-1.0-SNAPSHOT.war
- start_backend.sh in which the 'build phase' has been removed.
