CREATE ROLE universitaet WITH LOGIN PASSWORD 'p';

CREATE DATABASE universitaet;

GRANT ALL ON DATABASE universitaet TO universitaet;

CREATE TABLESPACE universitaetspace OWNER universitaet LOCATION '/var/lib/postgresql/universitaet';