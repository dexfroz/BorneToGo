# BorneToGo Database

Database part of the BorneToGo project.


## Installation

### Production ready

Install [Docker](https://docs.docker.com/engine/install) and [Docker Compose.](https://docs.docker.com/compose/install)

### For testing with a GUI

1. Install XAMPP (Version 8.0.1) [XAMPP](https://www.apachefriends.org/download.html)
2. Run Xampp Control Panel
3. Start Apache and MySQL
4. Admin MySQL bring us to phpMyAdmin
5. In the Import tab, import all the *.sql* files. See the ``` fill.sh ``` script for the right order.
6. If the database filling fails due to a too long request, you need to modify phpMyAdmin settings.
7. In \xampp\phpMyAdmin\libraries\config.default.php -> $cfg[‘ExecTimeLimit’] = 300; Increase 300.


## Database architecture

![Database architecture](/Database/images/Schema_BDD_V8.png)


## Usage:

To fill the database:

```
sh fill.sh
```

To access the database from CLI:

```
mysql -h 127.0.0.1 -P 3306 --protocol=tcp -u root -p
```


## TODO:

- Database only filled via another mysql next to the docker one: use the container instead? Or instead create another image/container, as to have one for the filling, and the other used as mysql server?


## Fixed Issues:

- Database filling was crashing when not using 'time' before the command (runtime too long).
- The container MySQL needed to be accessed *once* by CLI, otherwise the Backend would fail to connect to it. Waiting for 10 minutes seemed to resolve the issue too...

The fix was to change from docker image, from ``` mysql:8.0 ``` to ``` mysql:5.7 ```, or even better ``` mariadb:10.5 ```. What follows is a comparison between those docker images for our database:


|            | Mysql 8.0 | Mysql 5.7 | MariaDB 10.5
:----------: | :-------: | :-------: | :----------:
Filling time | 4min 30s  | 1min 40s  | 50 s
Disk space   | ~ 220 Mb  | ~ 220 Mb  | ~ 150 Mb
