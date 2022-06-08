-- Deploy fresh database tables

-- i for execute scripts
-- create tables
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/logins.sql'
\i '/docker-entrypoint-initdb.d/tables/balances_children.sql'

-- seed tables
\i '/docker-entrypoint-initdb.d/seed/seed.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_users.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_logins.sql'
\i '/docker-entrypoint-initdb.d/seed/seed_balances_children.sql'
