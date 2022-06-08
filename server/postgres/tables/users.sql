BEGIN TRANSACTION;

CREATE TABLE users (
    user_id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    address_id int DEFAULT 0,
    admin boolean DEFAULT FALSE,
    active boolean DEFAULT TRUE,
    deleted boolean DEFAULT FALSE,  
    date_create TIMESTAMP NOT NULL,
    user_create INT DEFAULT 0, 
    date_change TIMESTAMP NULL,
    user_change INT NULL
);

COMMIT;