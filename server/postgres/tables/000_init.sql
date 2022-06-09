BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS bank_accounts_children;
DROP TABLE IF EXISTS bank_transactions_children;
DROP TABLE IF EXISTS todoes;
DROP TABLE IF EXISTS calories;
DROP TABLE IF EXISTS vocabularies;
DROP TABLE IF EXISTS languages;


CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "username" varchar(250) NOT NULL,
  "email" varchar(250) UNIQUE NOT NULL,
  "firstname" varchar(100) NULL,
  "surname" varchar(100) NULL,
  "address_id" int DEFAULT 0,
  "role" int DEFAULT 2,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp NOT NULL,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "logins" (
  "login_id" SERIAL PRIMARY KEY,
  "hash" varchar(200) NOT NULL,
  "email" varchar(250) UNIQUE NOT NULL
);

CREATE TABLE "bank_accounts_children" (
  "account_id" SERIAL PRIMARY KEY,
  "account_name" varchar(100) DEFAULT 'DUMMY',
  "account_value" numeric(5, 2) DEFAULT 0,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp NOT NULL,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "bank_transactions_children" (
  "transaction_id" SERIAL PRIMARY KEY,
  "account_id" int NOT NULL,
  "transaction_text" varchar(200),
  "transaction_value" numeric(5, 2) DEFAULT 0,
  "account_value" numeric(5, 2) DEFAULT 0,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp NOT NULL,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "todoes" (
  "todo_id" SERIAL PRIMARY KEY,
  "name" varchar(200) UNIQUE NOT NULL,
  "desc" varchar(200),
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp NOT NULL,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "calories" (
  "item_id" SERIAL PRIMARY KEY,
  "item_name" varchar(100) UNIQUE NOT NULL,
  "item_desc" varchar(200),
  "qty" numeric(5, 2) DEFAULT 0,
  "unit" varchar(50) NOT NULL,
  "calories" numeric(5, 2) DEFAULT 0,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp NOT NULL,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "vocabularies" (
  "voc_id" SERIAL PRIMARY KEY,
  "german" varchar(500) NOT NULL,
  "translation" varchar(500) NOT NULL,
  "language_code" varchar(10) NOT NULL,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp NOT NULL,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "languages" (
  "language_id" SERIAL PRIMARY KEY,
  "language_code" varchar(10) UNIQUE NOT NULL,
  "name" varchar(10) NOT NULL,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp NOT NULL,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

ALTER TABLE "logins" ADD FOREIGN KEY ("email") REFERENCES "users" ("email");

ALTER TABLE "bank_accounts_children" ADD FOREIGN KEY ("account_id") REFERENCES "users" ("user_id");

ALTER TABLE "bank_transactions_children" ADD FOREIGN KEY ("account_id") REFERENCES "bank_accounts_children" ("account_id");

ALTER TABLE "vocabularies" ADD FOREIGN KEY ("language_code") REFERENCES "languages" ("language_code");

COMMIT;
