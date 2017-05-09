#!/usr/bin/env bash

# infos here
# http://www.sqlitetutorial.net/sqlite-like/
# http://www.sqlitetutorial.net/sqlite-glob/

# select all food_types as csv with header from bash script
sqlite3 foods.db <<!
.headers on
.mode csv
select * from food_types;
!


echo
# select first 15 foods as pretty terminal table from bash script 
sqlite3 foods.db <<!
.header on
.mode column
select * from foods limit 10;
!

echo
# select with `like`, (case insensitive)
# chars ' or " are required
sqlite3 foods.db <<!
.header on
.mode column
select id, name from foods where name like 'j%';
!

echo
# select more with `like`...
sqlite3 foods.db <<!
.header on
.mode column
select id, name from foods where name like '%j%' limit 10;
!

echo
# select with `glob`, (case sensitive) ... print nothing
sqlite3 foods.db <<!
.header on
.mode column
select id, name from foods where name glob 'j*';
!

echo
# select with `glob`, (case sensitive)
sqlite3 ref.db <<!
.header on
.mode column
select id, name from foods where name glob 'J*';
!
