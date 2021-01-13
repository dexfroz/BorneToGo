# BorneToGo

BDD brand of the BorneToGo project. This is *work-in-progress* version of the BDD project. All BDD dev commits have to be done here.

## Architecture de la BDD
![Architecture de la BDD](/images/Schema_BDD.png)

## Architecture Requête

### INSERT INTO station
`INSERT INTO Station (idStation, Latitude, Longitude, Adresse, Ville, CodePostal, Titre, Paiement) VALUES ('171965','46.204107','-1.372894','87 Cours Pasteur','Saint-Martin-de-Ré','17410','Le Clos Saint-Martin Hôtel & Spa','7');`

### INSERT INTO borne
`INSERT INTO borne (IDBorne, IDStation, IDConnecteur, Puissance, Status) VALUES ('6789', '6948', '0', '3.5', '0');`
