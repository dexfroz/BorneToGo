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
![Architecture de la BDD V8](/BDD/images/Schema_BDD_V8.png)

### Détails
 - Capacité = kWh
 - Autonomie = km
 - Chargement = %
 - Puissance = kW

## TODO Voiture
- [x] Renault ZEO
- [x] Tesla Model 3
- [x] Peugeot e-208
- [x] Volkswagen ID. 3
- [x] Tesla Model S
- [x] BMW i3
- [x] Renault Twizy
- [x] Kia e-Niro
- [x] Citroën AMI
- [x] Tesla Model Y
- [x] Porsche Taycan
- [x] Hyundai Kona électrique
- [x] Tesla Model X
- [x] Audi e-tron
- [x] Honda e
- [x] Mercedes EQC
- [x] Renault Twingo Z.E
- [x] DS 3 Crossback e-Tense
- [x] Nissan Leaf
- [x] Peugeot e-2008
- [x] Mini Cooper SE
- [x] Opel Corsa-e
- [x] Ford Mustang Mach-E
- [x] Smart Fortwo Electric Drive
- [x] Peugeot iOn
- [x] Renault Kangoo ZE
- [x] Volkswagen e-UP
- [x] Hyundai Ioniq électrique
- [x] Citroën e-Méhari
- [x] Skoda Citigo e iV
- [x] Jaguar i-Pace
- [x] Volkswagen ID. 4
- [x] Audi e-tron Sportback
- [x] MG ZS EV
- [x] Citroën C-Zero
- [x] BMW iX3
- [x] Skoda Enyaq
- [x] Nissan e-NV200
- [x] Citroën ë-C4
- [x] Bolloré Bluesummer
- [x] Peugeot Partner Electric
- [x] Volvo XC40 Recharge
- [x] Seat Mii Electrique
- [x] BMW i3s
- [x] Smart Forfour Electric Drive
- [x] Mazda MX-30
- [x] Opel Mokka-e
- [x] Renault Master ZE
- [x] Lexus UX 300e
- [x] Mitsubishi i-MiEV
- [x] Kia e-Soul EV
- [x] Fiat 500e
- [x] Peugeot Partner Tepee Electric
- [x] Nissan e-NV200 Evalia
- [x] Volkswagen e-Crafter
- [x] Citroën e-Berlingo Multispace
- [x] Mercedes eVito
- [x] Citroën ë-SpaceTourer
- [x] Mercedes eSprinter
- [x] Opel Zafira-e Life