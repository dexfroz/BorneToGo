# BorneToGo backend

Backend for the BorneToGo ISEN's project, an app whose purpose is to help finding where to charge electric cars.

Concretely, given an user request of either recharging his electric car, or planing a trip, the backend must find the route of lower duration and cost, and return the result to the frontend, for it to be shown to the user. Said backend is provided with an asynchronous REST API. It uses the docker image Payara Micro, and Jakarta EE.


## Installation (Linux)

Install docker, java 1.8 (jdk + jre), and maven 3.6.3. Don't forget to export the JAVA_HOME and M2_HOME environment variables, and if under a proxy to properly setup the setting.xml file, which must be placed in the ```~/.m2``` directory.

Download the Payara Micro docker image, found at <https://hub.docker.com/r/payara/micro>, by running:

```
sudo docker pull payara/micro
```

Finally, an API key for the service <https://developer.mapquest.com> must be generated, and stored in a file:

```
src/main/resources/secret/mapquestapi
```


## Runtime:

Compile the project by running: ``` sh build.sh ```

Start the docker process with: ``` sudo systemctl start docker ```

Then run: ``` sudo sh deploy.sh ```

To obtain a path from the backend, send a POST request containing the user given steps in a json file, like below:

```
curl -w '\n' -X POST -H "Content-Type: application/json" \
 --data '{"type":"input","convention":"long-lat","useCase":"trip","optimOption":"default","car":{"model":"Tesla cybertruck","subscription":"","batteryType":"","maxAutonomy":200,"currentAutonomy":50,"maxWattage":42.1,"connectors":["EF-T2","EF"]},"userSteps":[{"location":[5.928,43.124228],"name":"Toulon","address":""},{"location":[5.36978,43.296482],"name":"Marseille","address":""},{"location":[4.83566,45.76404],"name":"Lyon","address":""},{"location":[5.05015,47.34083],"name":"Dijon","address":""},{"location":[2.3499,48.85661],"name":"Paris","address":""}]}' \
 http://localhost:8080/bornetogo/backend/path
```

A path will then be returned, with some additional data. Note that the output of the previous command may be saved in a file, by appending ``` > result.json ``` at its end.

On the other hand, one could test this without using curl - on a hardcoded example - simply by pasting the following link into a web browser:

```
http://localhost:8080/bornetogo/backend/mock
```

Similarly, to get the list of all supported cars, use the link:

```
http://localhost:8080/bornetogo/backend/cars
```


## Deployment:

Once the project is done, and needs to be deployed e.g on a server, java and maven need not to be reinstalled there again! Indeed, the docker image contains a java JRE. Therefore, the only files necessary for this to run are:

- This README
- Dockerfile
- target/bornetogo-backend-1.0-SNAPSHOT.war
- deploy.sh
- The API key


## TODO:

- Load from the MySQL database cars, stations, connectors, batteries...
- Get both cost and duration of a recharging.
- Add multiple-criteria optimization in the pathfinding, and therefore use the input field "optimOption".
- Update the output file with stations data, in the field: "data": {}
- Add the feature of returning several routes in the answer.
- Provide a documentation, with detailed explanations on the workings of the backend, especially the core program and the pathfinding part.
- Generate statistics about the found path.
- (Optional) add a timeout to all API queries.
- (Optional) add a logger, to better trace the failures of the whole app.


## Possible optimizations:

- Bypass many distance computations in the pathfinding, by using various tricks, like precomputation or factorization. Note: for now this is overkill, since said pathfinding take less than 0.1 second to run.
