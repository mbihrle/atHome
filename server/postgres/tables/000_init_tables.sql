BEGIN TRANSACTION;

ALTER DATABASE "atHome" SET timezone TO 'Europe/Berlin';

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS bank_accounts_children;
DROP TABLE IF EXISTS bank_transactions_children;
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS weekdays;
DROP TABLE IF EXISTS calories;
DROP TABLE IF EXISTS vocabularies;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS shoppinglist;
DROP TABLE IF EXISTS foods;


CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "username" varchar(250) NOT NULL,
  "email" varchar(250) UNIQUE NOT NULL,
  "hash" varchar(250) NOT NULL,
  "token" varchar(250) UNIQUE,
  "firstname" varchar(100) NULL,
  "lastname" varchar(100) NULL,
  "middlename" varchar(100) NULL,
  "address_id" int DEFAULT 0,
  "role" int DEFAULT 2,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp default CURRENT_TIMESTAMP,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "logins" (
  "login_id" SERIAL PRIMARY KEY,
  "user_id" int UNIQUE NOT NULL,
  "email" varchar(250) UNIQUE NOT NULL,
  "hash" varchar(250) NOT NULL,
  "token" varchar(250) UNIQUE,
  "date_create" timestamp default CURRENT_TIMESTAMP,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int DEFAULT 0
);

CREATE TABLE "bank_accounts_children" (
  "account_id" SERIAL PRIMARY KEY,
  "account_name" varchar(100) DEFAULT 'DUMMY',
  "account_value" numeric(10, 2) DEFAULT 0,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp default CURRENT_TIMESTAMP,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "bank_transactions_children" (
  "transaction_id" SERIAL PRIMARY KEY,
  "account_id" int NOT NULL,
  "transaction_text" varchar(200),
  "transaction_value" numeric(10, 2) DEFAULT 0,
  "type" varchar(100) DEFAULT 'Einzahlung',
  "account_value" numeric(10, 2) DEFAULT 0,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp DEFAULT CURRENT_TIMESTAMP,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "todos" (
  "todo_id" SERIAL PRIMARY KEY,
  "order_nr" int DEFAULT 0,
  "title" varchar(200) NOT NULL,
  "desc" varchar(200),
  "priority" int DEFAULT 0,
  "date_due" TIMESTAMP,
  "owner" int DEFAULT 0,
  "in_progress" boolean DEFAULT false,
  "weekday_completion" int DEFAULT 0,
  "repetion" boolean DEFAULT false,
  "completed" boolean DEFAULT false,
  "date_completion" TIMESTAMP,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp default CURRENT_TIMESTAMP,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "weekdays" (
  "weekday_id" INT PRIMARY KEY,
  "name" varchar(50) UNIQUE NOT NULL,
  "name_sh" varchar(10),
  "date_create" timestamp default CURRENT_TIMESTAMP,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "shoppingitems" (
  "item_id" SERIAL PRIMARY KEY,
  "good" varchar(200) UNIQUE NOT NULL,
  "desc" varchar(200),
  "execution_by" int DEFAULT 0,
  "execution_when" int DEFAULT 0,
  "repetion" boolean DEFAULT false,
  "priority" int DEFAULT 0,
  "completed" boolean DEFAULT false,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp default CURRENT_TIMESTAMP,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "foods" (
  "food_id" SERIAL PRIMARY KEY,
  "food" varchar(200) UNIQUE NOT NULL,
  "desc" varchar(200),
  "execution_by" int DEFAULT 0,
  "weekday_completion" int DEFAULT 0,
  "repetion" boolean DEFAULT false,
  "priority" int DEFAULT 0,
  "completed" boolean DEFAULT false,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp default CURRENT_TIMESTAMP,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

CREATE TABLE "calories" (
  "item_id" SERIAL PRIMARY KEY,
  "item_name" varchar(100) UNIQUE NOT NULL,
  "item_desc" varchar(200),
  "qty" numeric(10, 2) DEFAULT 0,
  "unit" varchar(50) NOT NULL,
  "calories" numeric(10, 2) DEFAULT 0,
  "active" boolean DEFAULT true,
  "deleted" boolean DEFAULT false,
  "date_create" timestamp default CURRENT_TIMESTAMP,
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
  "date_create" timestamp default CURRENT_TIMESTAMP,
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
  "date_create" timestamp default CURRENT_TIMESTAMP,
  "user_create" int DEFAULT 0,
  "date_change" timestamp,
  "user_change" int
);

ALTER TABLE "logins" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "bank_accounts_children" ADD FOREIGN KEY ("account_id") REFERENCES "users" ("user_id");

ALTER TABLE "bank_transactions_children" ADD FOREIGN KEY ("account_id") REFERENCES "bank_accounts_children" ("account_id");

ALTER TABLE "vocabularies" ADD FOREIGN KEY ("language_code") REFERENCES "languages" ("language_code");

ALTER TABLE "todos" ADD FOREIGN KEY ("weekday_completion") REFERENCES "weekdays" ("weekday_id");

ALTER TABLE "foods" ADD FOREIGN KEY ("weekday_completion") REFERENCES "weekdays" ("weekday_id");

COMMIT;
