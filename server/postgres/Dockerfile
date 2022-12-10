FROM postgres:14

ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD /views/ /docker-entrypoint-initdb.d/views/
ADD /functions/ /docker-entrypoint-initdb.d/functions/
ADD /triggers/ /docker-entrypoint-initdb.d/triggers/
ADD /seed/ /docker-entrypoint-initdb.d/seed/


ADD deploy_schemas.sql /docker-entrypoint-initdb.d/