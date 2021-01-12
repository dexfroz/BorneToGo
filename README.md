# BorneToGo

BDD brand of the BorneToGo project. This is *work-in-progress* version of the BDD project. All BDD dev commits have to be done here.

## Architecture de la BDD
![Architecture de la BDD](/images/Schema_BDD.png)

## Architecture Requête

### INSERT INTO station
`INSERT INTO station (IDStation, Latitude, Longitude, Adresse, Payement) VALUES ('6927', '48.867521', '2.3317144999999755', '39, Place du Marché Saint-Honoré', '1');`

### INSERT INTO borne
`INSERT INTO station (IDBorne, IDStation, IDConnecteur, Puissance, Status) VALUES ('6789', '6948', '0', '3.5', '0');`
