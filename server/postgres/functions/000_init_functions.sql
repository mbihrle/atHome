BEGIN TRANSACTION;

CREATE OR REPLACE FUNCTION update_date_change()   
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_change = now();
    RETURN NEW;   
END;
$$ language 'plpgsql';





COMMIT;