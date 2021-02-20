# BorneToGo backend

Backend for the BorneToGo ISEN's project, an app whose purpose is to help finding where to charge electric cars.

Concretely, given an user request of either recharging his electric car, or planing a trip, the backend must find the route of lower duration and cost, and return the result to the frontend, for it to be shown to the user. Said backend is provided with an asynchronous REST API. It uses a docker image of Payara Micro, an open-source application server which is Jakarta EE compliant.


## Installation (Linux)

Install Java 1.8 (JDK + JRE), and maven 3.6.3. Don't forget to export the JAVA_HOME and M2_HOME environment variables, and if under a proxy to properly setup the ``` setting.xml ``` file, which must be placed in the ```~/.m2``` directory. Finally, install [Docker](https://docs.docker.com/engine/install) and [Docker Compose.](https://docs.docker.com/compose/install)

The docker image used will be downloaded automatically, however it can still be found [here.](https://hub.docker.com/r/payara/micro)

Finally, an API key for the service <https://developer.mapquest.com> must be generated, and stored in a file:

```
src/main/resources/secret/mapquestapi
```


## Runtime:

Compile the project by running: ``` sh build.sh ```

To start using the API, start the docker process with: ``` sudo systemctl start docker ```

To build the docker image, run ``` sudo docker-compose build ```. Note that this step should be done after each compilation.

Then launch a container with: ``` sudo docker-compose up -d ```

To obtain a path from the backend, send a POST request containing the user given steps in a json file, like below:

```
curl -w '\n' -X POST -H "Content-Type: application/json" \
 --data '{"type":"input","convention":"long-lat","useCase":"trip","optimOption":"default","car":{"model":"Renault ZOE R135","subscription":"","maxAutonomy":390,"currentAutonomy":250,"capacity":52,"courantConnecteurs":[{"courant":"AC (Three-Phase)","connecteur":"IEC 62196-2 Type 2","puissance":22}]},"userSteps":[{"location":[5.928,43.124228],"name":"Toulon","address":""},{"location":[5.36978,43.296482],"name":"Marseille","address":""},{"location":[4.83566,45.76404],"name":"Lyon","address":""},{"location":[5.05015,47.34083],"name":"Dijon","address":""},{"location":[2.3499,48.85661],"name":"Paris","address":""}]}' \
 http://localhost:4321/bornetogo/backend/path
```

A path will then be returned, with some additional data. Note that the output of the previous command may be saved in a file, by appending ``` > result.json ``` at its end.

On the other hand, one could test this without using curl - on a hardcoded example - simply by pasting the following link into a web browser:

```
http://localhost:4321/bornetogo/backend/mockpath
```

Similarly, to get the list of all supported cars, use the link:

```
http://localhost:4321/bornetogo/backend/cars
```

Finally, note that the port 4321 used can be configured in the ``` docker-compose.yml ``` file.


## Deployment:

Once the project is done, and needs to be deployed e.g on a web server, java and maven need not to be reinstalled there again! Indeed, the docker image contains a java JRE. Therefore, only Docker and Docker Compose are to be installed, and the only files necessary for this to run are:

- This README
- Dockerfile
- docker-compose.yml
- The target/ directory containing only the .war file.


## TODO:

- Add the feature of returning several routes in the answer.
- Provide a documentation, with detailed explanations on the workings of the backend, especially the core program and the pathfinding part.
- Generate statistics about the found path.
- (Future) query temperature data for the next few hours on a region/country level, use it in the autonomy left computation, and modify the pathfinding accordingly.
