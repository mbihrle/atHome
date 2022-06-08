BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS public.financial_transactions_children (
    transaction_id serial NOT NULL,
    balance_id INTEGER NOT NULL,
    amount NUMERIC(5, 2) DEFAULT 0,
    deleted boolean DEFAULT FALSE,  
    date_create TIMESTAMP NOT NULL,
    user_create INT DEFAULT 0, 
    date_change TIMESTAMP NULL,
    user_change INT NULL,
	PRIMARY KEY (transaction_id)
	FOREIGN KEY (balance_id)
		REFERENCES balances_children(balance_id)
);
COMMIT;