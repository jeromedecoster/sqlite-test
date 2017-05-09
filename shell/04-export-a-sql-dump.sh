#!/usr/bin/env bash

# infos here
# http://www.sqlitetutorial.net/sqlite-dump/

# remove previous files
rm -f dump-*.sql

# export sql file (dump) of all db from bash script
sqlite3 foods.db .dump > dump-foods.sql

# export sql file (dump) of 1 table from bash script
sqlite3 foods.db '.dump episodes' > dump-foods-episodes.sql

# export sql file (dump) of 2 tables from bash script
sqlite3 foods.db '.dump foods' '.dump episodes' > dump-foods-episodes-foods.sql

# dump data structure only of all db with .schema
sqlite3 foods.db .schema > dump-schema-food.sql

# dump data structure only of 1 table with .schema
sqlite3 foods.db '.schema episodes' > dump-schema-episodes.sql

# log the content
cat dump-foods-episodes-foods.sql

# log the content
echo
cat dump-schema-food.sql
