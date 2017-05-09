#!/usr/bin/env bash

# infos here
# http://www.sqlitetutorial.net/sqlite-limit/

# select foods order by `name` and get the 10 first results from bash script
sqlite3 foods.db <<!
.header on
.mode column
select id, name from foods where name like 'c%' order by name limit 10;
!

echo
# select foods order by `name` and get the 10 first results from 2nd result
sqlite3 foods.db <<!
.header on
.mode column
select id, name from foods where name like 'c%' order by name limit 10 offset 2;
!

echo
# select foods order by `name` and get the 10 first results from 4th result
# the short notation is: `LIMIT OFFSET, COUNT`
sqlite3 foods.db <<!
.header on
.mode column
select id, name from foods where name like 'c%' order by name limit 4, 10;
!

