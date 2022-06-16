BEGIN TRANSACTION;

DROP VIEW IF EXISTS public.v_bank_transactions_children;
CREATE VIEW  public.v_bank_transactions_children
AS
select 
	BA.account_name,
	BT.*
 FROM
 (
 SELECT 
    max(bank_transactions_children.transaction_id) AS transaction_id,
    bank_transactions_children.account_id
  FROM 
    bank_transactions_children
  WHERE 
    bank_transactions_children.active = true AND bank_transactions_children.deleted = false
  GROUP BY 
    bank_transactions_children.account_id
  ) as LVT -- latest valid transaction
  join
  (
    select account_id, account_name
    from bank_accounts_children
	where active = true and deleted = false
   ) as BA -- bank accounts
   on LVT.account_id = BA.account_id
   join
   (
   select *
     from bank_transactions_children
	 where active = true and deleted = false
   ) as BT --bank transactions
   on LVT.transaction_id = BT.transaction_id
  ;
	
COMMIT;

