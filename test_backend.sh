#!/bin/sh

# Some GET and POST request examples:

curl -w '\n' http://localhost:8080/bornetogo/backend

curl -w '\n' http://localhost:8080/bornetogo/backend/get/123

curl -w '\n' -X POST --data 'This is my request.' http://localhost:8080/bornetogo/backend/post

curl -w '\n' http://localhost:8080/bornetogo/backend/file
