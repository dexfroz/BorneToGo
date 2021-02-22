DROP DATABASE IF EXISTS `BorneToGo`;

CREATE DATABASE `BorneToGo` DEFAULT CHARACTER SET latin1;

CREATE TABLE `BorneToGo`.`Paiement` (
	`idPaiement` INT UNSIGNED PRIMARY KEY,
	`Titre` VARCHAR(64),
	`isPayAtLocation` BOOLEAN,
	`isMembershipRequired` BOOLEAN,
	`isAccessKeyRequired` BOOLEAN
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Status` (
	`idStatus` INT UNSIGNED PRIMARY KEY,
	`Titre` VARCHAR(64),
	`isOperational` BOOLEAN,
	`isUserSelectable` BOOLEAN
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Connecteur` (
	`idConnecteur` INT UNSIGNED PRIMARY KEY,
	`Titre` VARCHAR(64),
	`Name` VARCHAR(64)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Courant` (
	`idCourant` INT UNSIGNED PRIMARY KEY,
	`Titre` VARCHAR(32),
	`Description` VARCHAR(64)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Batterie` (
	`idBatterie` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`Capacite` DECIMAL(6, 2),
	`Autonomie` DECIMAL(6, 2)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Voiture` (
	`idVoiture` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`idBatterie` INT UNSIGNED,
	`Modele` VARCHAR(128),
	`Chargement` INT,
	CONSTRAINT `fk_Batterie` FOREIGN KEY (`idBatterie`) REFERENCES `Batterie`(`idBatterie`)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`VCC` (
	`idVCC` INT UNSIGNED PRIMARY KEY,
	`idVoiture` INT UNSIGNED,
	`idConnecteur` INT UNSIGNED,
	`idCourant` INT UNSIGNED,
	`Puissance` DECIMAL(6, 2),
	CONSTRAINT `fk_Voiture_VCC` FOREIGN KEY (`idVoiture`) REFERENCES `Voiture`(`idVoiture`),
	CONSTRAINT `fk_Connecteur_VCC` FOREIGN KEY (`idConnecteur`) REFERENCES `Connecteur`(`idConnecteur`),
	CONSTRAINT `fk_Courant_VCC` FOREIGN KEY (`idCourant`) REFERENCES `Courant`(`idCourant`)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Station` (
	`idStation` INT UNSIGNED PRIMARY KEY,
	`idPaiement` INT UNSIGNED,
	`Titre` VARCHAR(64),
	`Latitude` DECIMAL(9, 6),
	`Longitude` DECIMAL(9, 6),
	`Adresse` VARCHAR(128),
	`Ville` VARCHAR(64),
	`Codepostal` INT(5) UNSIGNED,
	CONSTRAINT `fk_Paiement` FOREIGN KEY (`idPaiement`) REFERENCES `Paiement`(`idPaiement`)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Borne` (
	`idBorne` INT UNSIGNED PRIMARY KEY,
	`idConnecteur` INT UNSIGNED,
	`idCourant` INT UNSIGNED,
	`idStatus` INT UNSIGNED,
	`Puissance` DECIMAL(6, 2),
	CONSTRAINT `fk_Connecteur_Borne` FOREIGN KEY (`idConnecteur`) REFERENCES `Connecteur`(`idConnecteur`),
	CONSTRAINT `fk_Courant_Borne` FOREIGN KEY (`idCourant`) REFERENCES `Courant`(`idCourant`),
	CONSTRAINT `fk_Status_Borne` FOREIGN KEY (`idStatus`) REFERENCES `Status`(`idStatus`)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`StationBorne` (
	`idStationBorne` INT UNSIGNED PRIMARY KEY,
	`idStation` INT UNSIGNED,
	`idBorne` INT UNSIGNED,
	CONSTRAINT `fk_Station` FOREIGN KEY (`idStation`) REFERENCES `Station`(`idStation`),
	CONSTRAINT `fk_Borne` FOREIGN KEY (`idBorne`) REFERENCES `Borne`(`idBorne`)
)ENGINE=INNODB;
