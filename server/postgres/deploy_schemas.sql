-- Deploy fresh database tables

-- i for execute scripts
-- create tables
\i '/docker-entrypoint-initdb.d/tables/000_init_tables.sql'

-- create views
\i '/docker-entrypoint-initdb.d/views/000_init_views.sql'

-- create functions
\i '/docker-entrypoint-initdb.d/functions/000_init_functions.sql'

-- create triggers
\i '/docker-entrypoint-initdb.d/triggers/000_init_triggers.sql'

-- seed tables
\i '/docker-entrypoint-initdb.d/seed/seed_users.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_logins.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_bank_accounts_children.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_bank_transactions_children.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_weekdays.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_todos.sql'
