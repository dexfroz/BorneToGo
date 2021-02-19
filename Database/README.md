# BorneToGo Database

Database part of the BorneToGo project.


## Installation

### Production ready

Install [Docker](https://docs.docker.com/engine/install) and [Docker Compose.](https://docs.docker.com/compose/install)
Note that MySQL client or server need not to be installed, the container will be enough.

### For testing with a GUI

1. Install XAMPP (Version 8.0.1) [XAMPP](https://www.apachefriends.org/download.html)
2. Run Xampp Control Panel
3. Start Apache and MySQL
4. Admin MySQL bring us to phpMyAdmin
5. In the Import tab, import all the *.sql* files. See the ``` fill.sh ``` script for the right order.
6. If the database filling fails due to a too long request, you need to modify phpMyAdmin settings.
7. In \xampp\phpMyAdmin\libraries\config.default.php -> $cfg[‘ExecTimeLimit’] = 300; Increase 300.


## Filling the database:

To fill the database, start by running the MariaDB container with:

```
docker-compose up -d
```

Then run as sudoer:

```
sh fill.sh
```

This should take less than a minute, and have to be done only once. If MySQL client is installed, then one can access the database from CLI by using:

```
mysql -h localhost -P 3456 --protocol=tcp -u root -p
```


## Database architecture

![Database architecture](/Database/images/Schema_BDD_V8.png)
