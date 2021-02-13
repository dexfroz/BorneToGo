# Containerized database:


To fill the database:

```
time sh fill.sh
```

To access the database from CLI:

```
mysql -h 127.0.0.1 -P 3306 --protocol=tcp -u root -p
```

Issues:

- Database filling crash whennot using 'time' before the command (runtime too long).
- Database only filled via another mysql next to the docker one: use the container instead? Or instead create another image/container, as to have one for the filling, and the other used as mysql server?
