DROP DATABASE IF EXISTS `BorneToGo`;

-- Strict SQL mode disabled:
SET sql_mode = '';

CREATE DATABASE `BorneToGo` DEFAULT CHARACTER SET latin1;

CREATE TABLE `BorneToGo`.`Paiement` (
	`idPaiement`INT PRIMARY KEY,
	`Titre` VARCHAR(64),
	`isPayAtLocation` BOOLEAN,
	`isMembershipRequired` BOOLEAN,
	`isAccessKeyRequired` BOOLEAN
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Status` (
	`idStatus` INT PRIMARY KEY,
	`Titre` VARCHAR(64),
	`isOperational` BOOLEAN,
	`isUserSelectable` BOOLEAN
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Connecteur` (
	`idConnecteur` INT PRIMARY KEY,
	`Titre` VARCHAR(64),
	`Name` VARCHAR(64)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Courant` (
	`idCourant` INT PRIMARY KEY AUTO_INCREMENT,
	`Titre` VARCHAR(32),
	`Description` VARCHAR(64)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Batterie` (
	`idBatterie` INT AUTO_INCREMENT PRIMARY KEY,
	`Capacite` INT,
	`Autonomie` INT
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Station` (
	`idStation` INT PRIMARY KEY,
	`idPaiement` INT,
	`Titre` VARCHAR(64),
	`Latitude` DECIMAL(9, 6),
	`Longitude` DECIMAL(9, 6),
	`Adresse` VARCHAR(128),
	`Ville` VARCHAR(64),
	`Codepostal` INT(5) UNSIGNED,
	CONSTRAINT `fk_Paiement` FOREIGN KEY (`idPaiement`) REFERENCES `Paiement`(`idPaiement`)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Borne` (
	`idBorne` INT PRIMARY KEY,
	`idConnecteur` INT,
	`idCourant` INT,
	`idStatus` INT,
	`Puissance` INT,
	CONSTRAINT `fk_Connecteur_Borne` FOREIGN KEY (`idConnecteur`) REFERENCES `Connecteur`(`idConnecteur`),
	CONSTRAINT `fk_Courant_Borne` FOREIGN KEY (`idCourant`) REFERENCES `Courant`(`idCourant`),
	CONSTRAINT `fk_Status` FOREIGN KEY (`idStatus`) REFERENCES `Status`(`idStatus`)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`StationBorne` (
	`idStationBorne` INT PRIMARY KEY,
	`idStation` INT,
	`idBorne` INT,
	CONSTRAINT `fk_Station` FOREIGN KEY (`idStation`) REFERENCES `Station`(`idStation`),
	CONSTRAINT `fk_Borne` FOREIGN KEY (`idBorne`) REFERENCES `Borne`(`idBorne`)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`Voiture` (
	`idVoiture` INT AUTO_INCREMENT PRIMARY KEY,
	`idBatterie` INT,
	`Modele` VARCHAR(128),
	`Chargement` VARCHAR(32),
	CONSTRAINT `fk_Batterie` FOREIGN KEY (`idBatterie`) REFERENCES `Batterie`(`idBatterie`)
)ENGINE=INNODB;

CREATE TABLE `BorneToGo`.`VCC` (
	`idVCC` INT PRIMARY KEY,
	`idVoiture` INT,
	`idConnecteur` INT,
	`idCourant` INT,
	`Puissance` INT,
	CONSTRAINT `fk_Connecteur_VCC` FOREIGN KEY (`idConnecteur`) REFERENCES `Connecteur`(`idConnecteur`),
	CONSTRAINT `fk_Courant_VCC` FOREIGN KEY (`idCourant`) REFERENCES `Courant`(`idCourant`),
	CONSTRAINT `fk_Voiture_VCC` FOREIGN KEY (`idVoiture`) REFERENCES `Voiture`(`idVoiture`)
)ENGINE=INNODB;
