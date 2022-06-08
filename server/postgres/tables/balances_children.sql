BEGIN TRANSACTION;

CREATE TABLE balances_children (
    balance_id serial PRIMARY KEY,
    name VARCHAR(100) DEFAULT 'DUMMY',
    value NUMERIC(5, 2) DEFAULT 0
);

COMMIT;