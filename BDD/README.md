# BorneToGo

BDD brand of the BorneToGo project. This is *work-in-progress* version of the BDD project. All BDD dev commits have to be done here.

## Installation
1. Installer XAMPP (Version 8.0.1) [Lien d'installation XAMPP](https://www.apachefriends.org/download.html)
2. Lancer Xampp Control Panel
3. Start Apache et MySQL
4. Admin MySQL nous amène sur phpMyAdmin
5. Dans l'onglet Import, Browse le fichier **BDDScript2.sql**, enfin click Go
6. Si la création plante car la requête est trop longue, il faut modifier les paramètres de phpMyAdmin
7. D:\xampp\phpMyAdmin\libraries\config.default.php -> $cfg[‘ExecTimeLimit’] = 300; Changer 300 par beaucoup plus.

## Architecture de la BDD
![Architecture de la BDD V4](/images/Schema_BDD_V4.png)

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

### INSERT INTO voitureconnecteurcourant
Puissance est le plus petit de Voiture.Puissance et de Borne.Puissance.

## TODO Voiture
- [x] Renault ZEO
- [x] Tesla Model 3
- [x] Peugeot e-208
- [x] Volkswagen ID. 3
- [x] Tesla Model S
- [x] BMW i3
- [x] Renault Twizy
- [ ] Kia e-Niro
- [ ] Citroën AMI
- [ ] Tesla Model Y
- [ ] Porsche Taycan
- [ ] Hyundai Kona électrique
- [ ] Tesla Model X
- [ ] Audi e-tron
- [ ] Honda e
- [ ] Mercedes EQC
- [ ] Renault Twingo Z.E
- [ ] DS 3 Crossback e-Tense
- [ ] Nissan Leaf
- [ ] Peugeot e-2008
- [ ] Mini Cooper SE
- [ ] Opel Corsa-e
- [ ] Ford Mustang Mach-E
- [ ] Smart Fortwo Electric Drive
- [ ] Peugeot iOn
- [ ] Renault Kangoo ZE
- [ ] Volkswagen e-UP
- [ ] Hyundai Ioniq électrique
- [ ] Citroën e-Méhari
- [ ] Skoda Citigo e iV
- [ ] Jaguar i-Pace
- [ ] Volkswagen ID. 4
- [ ] Audi e-tron Sportback
- [ ] Citroën C-Zero
- [ ] BMW iX3
- [ ] Skoda Enyaq
- [ ] Nissan e-NV200
- [ ] Citroën ë-C4
- [ ] Bolloré Bluesummer
- [ ] Peugeot Partner Electric
- [ ] Volvo XC40 Recharge
- [ ] Seat Mii Electrique
- [ ] BMW i3s
- [ ] Smart Forfour Electric Drive
- [ ] Mazda MX-30
- [ ] Opel Mokka-e
- [ ] Renault Master ZE
- [ ] Lexus UX 300e
- [ ] Mitsubishi i-MiEV
- [ ] Kia e-Soul EV
- [ ] Fiat 500e
- [ ] Peugeot Partner Tepee Electric
- [ ] Nissan e-NV200 Evalia
- [ ] Volkswagen e-Crafter
- [ ] Citroën e-Berlingo Multispace
- [ ] Mercedes eVito
- [ ] Citroën ë-SpaceTourer
- [ ] Fuso eCanter
- [ ] Mercedes eSprinter
- [ ] Opel Zafira-e Life