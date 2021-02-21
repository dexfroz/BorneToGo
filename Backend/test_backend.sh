#!/bin/sh

# Some GET and POST request examples:

curl -w '\n\n' http://localhost:4321/bornetogo/backend/cars

curl -w '\n\n' http://localhost:4321/bornetogo/backend/mockpath

# curl -w '\n' -X POST -H "Content-Type: application/json" \
#  --data '{"type":"input","convention":"long-lat","useCase":"trip","optimOption":"default","car":{"model":"Renault ZOE R135","subscription":"","maxAutonomy":390,"currentAutonomy":250,"capacity":52,"courantConnecteurs":[{"courant":"AC (Three-Phase)","connecteur":"IEC 62196-2 Type 2","puissance":22}]},"userSteps":[{"location":[5.928,43.124228],"name":"Toulon","address":""},{"location":[5.36978,43.296482],"name":"Marseille","address":""},{"location":[4.83566,45.76404],"name":"Lyon","address":""},{"location":[5.05015,47.34083],"name":"Dijon","address":""},{"location":[2.3499,48.85661],"name":"Paris","address":""}]}' \
#  http://localhost:4321/bornetogo/backend/path

# Requires the database container to be running:
curl -w '\n\n' http://localhost:4321/bornetogo/backend/tableSize/Station
