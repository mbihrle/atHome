BEGIN TRANSACTION;

-- date_change for all tables
CREATE TRIGGER update_users_date_change BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_logins_date_change BEFORE UPDATE ON logins FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_bank_accounts_children_date_change BEFORE UPDATE ON bank_accounts_children FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_bank_transactions_children_date_change BEFORE UPDATE ON bank_transactions_children FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_todos_date_change BEFORE UPDATE ON todos FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_weekdays_date_change BEFORE UPDATE ON weekdays FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_shoppingitems_date_change BEFORE UPDATE ON shoppingitems FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_foods_date_change BEFORE UPDATE ON foods FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_calories_date_change BEFORE UPDATE ON calories FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_vocabularies_date_change BEFORE UPDATE ON vocabularies FOR EACH ROW EXECUTE PROCEDURE  update_date_change();

CREATE TRIGGER update_languages_date_change BEFORE UPDATE ON languages FOR EACH ROW EXECUTE PROCEDURE  update_date_change();



COMMIT;