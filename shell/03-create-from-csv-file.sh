#!/usr/bin/env bash

# foods.db from
# https://github.com/Apress/def-guide-to-sqlite-10/tree/master/9781430232254/ch01/examples

# infos here
# http://www.sqlitetutorial.net/sqlite-export-csv/
# http://www.sqlitetutorial.net/sqlite-import-csv/

# remove previous db and csv files
rm -f create-from-csv-file.db csv-file.csv

# export csv file from bash script
sqlite3 -csv foods.db "SELECT * FROM episodes" > csv-file.csv

# export csv file with header from bash script (just for readability)
sqlite3 -csv -header foods.db "SELECT * FROM episodes" > csv-file-with-header.csv


# create a db file a table and insert from csv file
# http://www.sqlitetutorial.net/sqlite-import-csv/
sqlite3 create-from-csv-file.db <<!
.mode csv
CREATE TABLE episodes (id integer primary key, season int, name text );
.import csv-file.csv episodes
!

# log the content
sqlite3 create-from-csv-file.db "SELECT * FROM episodes"