# BorneToGo

BDD brand of the BorneToGo project. This is *work-in-progress* version of the BDD project. All BDD dev commits have to be done here.

## Installation
1. Installer XAMPP (Version 8.0.1) [Lien d'installation XAMPP](https://www.apachefriends.org/download.html)
2. Lancer Xampp Control Panel
3. Start Apache et MySQL
4. Admin MySQL nous amène sur phpMyAdmin
5. Dans l'onglet Import, Browse le fichier **BDDScript2.sql**, enfin click Go
6. Profit

## Architecture de la BDD
![Architecture de la BDD V3](/images/Schema_BDD_V3.png)

## Architecture Requête

### INSERT INTO status
`INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('0','Unknown','None','True');`

### INSERT INTO paiement
`INSERT INTO BorneToGo.Paiement (idPaiement, Titre, IsPayAtLocation, IsMembershipRequired, IsAccessKeyRequired) VALUES ('0','(Unknown)','None','None');`

### INSERT INTO courant
`INSERT INTO BorneToGo.Courant (idCourant, Titre, Description) VALUES ('10','AC (Single-Phase)','Alternating Current - Single Phase');`

### INSERT INTO connecteur
`INSERT INTO BorneToGo.Connecteur (idConnecteur, Titre, Name) VALUES ('7','Avcon Connector','Avcon SAE J1772-2001');`

### INSERT INTO station
`INSERT INTO Station (idStation, Latitude, Longitude, Adresse, Ville, CodePostal, Titre, Paiement) VALUES ('171965','46.204107','-1.372894','87 Cours Pasteur','Saint-Martin-de-Ré','17410','Le Clos Saint-Martin Hôtel & Spa','7');`

### INSERT INTO borne
`INSERT INTO borne (IDBorne, IDStation, IDConnecteur, Puissance, Status) VALUES ('6789', '6948', '0', '3.5', '0');`

### INSERT INTO voiture

### INSERT INTO batterie
