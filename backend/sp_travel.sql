CREATE DATABASE IF NOT EXISTS sp_travel;

USE sp_travel;

CREATE TABLE admin (
    adminID INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE travelListing (
    travelID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    country VARCHAR(100) NOT NULL,
    travelPeriod VARCHAR(50) NOT NULL,
    imageURL VARCHAR(500) NOT NULL,
    dateInserted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itinerary (
    itineraryID INT AUTO_INCREMENT PRIMARY KEY,
    day INT NOT NULL,
    activity TEXT NOT NULL,
    travelID INT NOT NULL,
    FOREIGN KEY (travelID) REFERENCES travelListing(travelID)
);