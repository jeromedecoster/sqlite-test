#!/usr/bin/env bash

# infos here
# http://www.sqlitetutorial.net/sqlite-order-by/

# select foods order by `name desc` from bash script
# notice is case sensitive BLT comes before Bacon
sqlite3 foods.db <<!
.headers on
.mode column
select id, name from foods where name like 'b%' order by name desc;
!

echo
# select foods order by `name desc` with case insensitive result
# notice BLT comes now before Bologna 
sqlite3 foods.db <<!
.headers on
.mode column
select id, name from foods where name like 'b%' order by lower(name) desc;
!

echo
# order by 2 entries `type_id` asc then `name` asc 
sqlite3 foods.db <<!
.header on
.mode column
select * from foods where name like 'b%' order by type_id, lower(name);
!