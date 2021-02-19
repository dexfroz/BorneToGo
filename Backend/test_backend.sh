#!/bin/sh

# Some GET and POST request examples:

curl -w '\n\n' http://localhost:4321/bornetogo/backend/cars

curl -w '\n\n' http://localhost:4321/bornetogo/backend/mockpath

# curl -w '\n\n' -X POST -H "Content-Type: application/json" \
#  --data '{"type":"input","convention":"long-lat","useCase":"trip","optimOption":"default","car":{"model":"Tesla cybertruck","subscription":"","maxAutonomy":200,"currentAutonomy":50,"maxWattage":42.1,"capacity":13.0,"connectors":["EF-T2","EF"]},"userSteps":[{"location":[5.928,43.124228],"name":"Toulon","address":""},{"location":[5.36978,43.296482],"name":"Marseille","address":""},{"location":[4.83566,45.76404],"name":"Lyon","address":""},{"location":[5.05015,47.34083],"name":"Dijon","address":""},{"location":[2.3499,48.85661],"name":"Paris","address":""}]}' \
#  http://localhost:4321/bornetogo/backend/path

# Requires the database container to be running:
curl -w '\n\n' http://localhost:4321/bornetogo/backend/tableSize/Station
