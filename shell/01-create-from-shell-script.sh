#!/usr/bin/env bash

# remove previous db
rm -f create-from-shell-script.db

# create a db file, a table and insert some rows from bash script
sqlite3 create-from-shell-script.db <<!
CREATE TABLE episodes (id integer primary key, season int, name text );
INSERT INTO episodes VALUES(0, NULL, 'Good News Bad News');
INSERT INTO "episodes" VALUES(1, 1, 'Male Unbonding');
insert into "episodes" values(2, 1, 'The Stake Out');
!

# log the content
sqlite3 create-from-shell-script.db "SELECT * FROM episodes"