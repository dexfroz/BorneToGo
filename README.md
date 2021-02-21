# BorneToGo

![BorneToGo-logo](/resources/logo_borne_to_go.png)

BorneToGo is an ISEN school project. It is an app whose purpose is to help finding where to charge electric cars.


## Installation

Install [Docker](https://docs.docker.com/engine/install) and [Docker Compose.](https://docs.docker.com/compose/install)


## Runtime:

To build to backend on Linux, run:

```
cd Backend
sh build.sh
```

To do this on Windows, use:

```
cd Backend
.\build.sh
```

Then, launch both the backend and the database, run (eventually as sudoer):

```
docker-compose build
docker-compose up -d
```

The database needs to be built the first time. To do this on Linux:

```
cd Database
sudo sh fill.sh linux
```

And on Windows:

```
cd Database
.\fill.sh windows
```

To shut down the docker containers, run:

```
docker-compose up -d
```

For details are provided in the respective READMEs of the frontend, backend and the database.
