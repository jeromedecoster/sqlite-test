#!/usr/bin/env bash

# infos here
# http://www.sqlitetutorial.net/sqlite-update/
# http://www.sqlitetutorial.net/sqlite-delete/

# remove previous db
rm -f update-delete.db

# create a db file, a table and insert some rows from bash script
sqlite3 update-delete.db <<!
CREATE TABLE episodes (id integer primary key, season int, name text );
INSERT INTO episodes VALUES(0, NULL, 'Good News Bad News');
INSERT INTO "episodes" VALUES(1, 1, 'Male Unbonding');
insert into "episodes" values(2, 1, 'The Stake Out');
!

echo
# log the content
sqlite3 update-delete.db "SELECT * FROM episodes"

# update + insert
sqlite3 update-delete.db <<!
update episodes set id=11 where name='Male Unbonding';
update episodes set name='Honey Mustard', season=3 where id=2;
INSERT INTO episodes VALUES(129,7,'The Calzone');
!

echo
# log the content
sqlite3 update-delete.db "SELECT * FROM episodes"

# delete
sqlite3 update-delete.db <<!
delete from episodes where name like '%bond%';
delete from episodes where id=0;
!

echo
# log the content
sqlite3 update-delete.db "SELECT * FROM episodes"
