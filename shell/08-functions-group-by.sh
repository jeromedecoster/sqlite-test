#!/usr/bin/env bash

# infos here
# http://www.sqlitetutorial.net/sqlite-functions/
# http://www.sqlitetutorial.net/sqlite-group-by/

# select foods starting with `bu` and display uppercase names + length of each name
sqlite3 foods.db <<!
.header on
.mode column
select id, upper(name), length(name) from foods where name like 'bu%';
!

echo
# count the number of food found in the season 1
sqlite3 foods.db <<!
.header on
.mode column
select count(*) from episodes where season=1;
!

# grouping
# an essential part of aggregation is grouping. That is, in addition to computing 
# aggregates over an entire result, you can also split that result into groups of 
# rows with like values and compute aggregates on each group—all in one step.

echo
# count the number of found found by season
sqlite3 foods.db <<!
.header on
.mode column
select season, count(*) from episodes group by season;
!

echo
# count the number of found found by season (expluding `null` season)
sqlite3 foods.db <<!
.header on
.mode column
select season, count(*) from episodes where season not null group by season;
!
