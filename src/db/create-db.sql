DROP DATABASE IF EXISTS test_db;
CREATE DATABASE IF NOT EXISTS test_db;

USE test_db;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users
(
    userId INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(150) NOT NULL,
    surname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL,
    role ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser' NOT NULL
    );

DROP TABLE IF EXISTS cars;

CREATE TABLE cars
(
    carId INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    carName varchar(150) NOT NULL,
    status BOOLEAN NOT NULL,
    price FLOAT NOT NULL,
    specifications varchar(500) NOT NULL
);

DROP TABLE IF EXISTS `rents`;

CREATE TABLE rents
(
     rentId INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
     userId INT NOT NULL,
     carId INT NOT NULL,
     fullPrice FLOAT NOT NULL,
     rentFrom date NOT NULL,
     rentTo date NOT NULL
);