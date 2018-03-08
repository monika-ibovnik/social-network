CREATE DATABASE network;

DROP TABLE IF EXISTS heroes;
CREATE TABLE heroes (
    id SERIAL PRIMARY KEY,
    supername VARCHAR(255) UNIQUE not null,
    email VARCHAR(255) UNIQUE not null,
    password VARCHAR(300) not null,
    created TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE IF EXISTS pictures;
CREATE TABLE pictures(
    id SERIAL PRIMARY KEY,
    filename VARCHAR (300) UNIQUE not null,
    userid INTEGER UNIQUE not null,
    created TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE IF EXISTS profile;
CREATE TABLE profile(
    id SERIAL PRIMARY KEY,
    bio TEXT,
    superpower VARCHAR(300),
    userid INTEGER UNIQUE not null,
    created TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE IF EXISTS friendship_status;
CREATE TABLE friendship_status(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    status SMALLINT NOT NULL
);
