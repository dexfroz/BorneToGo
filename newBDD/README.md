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

- The container MySQL needs to be accessed *once* by CLI, otherwise the Backend will fail to connect to it. Waiting 10 minutes seems to resolve the issue also...
- Database filling crash whennot using 'time' before the command (runtime too long).
- Database only filled via another mysql next to the docker one: use the container instead? Or instead create another image/container, as to have one for the filling, and the other used as mysql server?
