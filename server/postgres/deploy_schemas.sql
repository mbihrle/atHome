-- Deploy fresh database tables

-- i for execute scripts
-- create tables
\i '/docker-entrypoint-initdb.d/tables/000_init.sql'
\i '/docker-entrypoint-initdb.d/tables/001_v_bank_transactions_children.sql'

-- seed tables
\i '/docker-entrypoint-initdb.d/seed/seed.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_users.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_logins.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_bank_accounts_children.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_bank_transactions_children.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_weekdays.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_todos.sql'
