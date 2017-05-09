#!/usr/bin/env bash

# remove previous db
rm -f create-from-sql-file.db

# create a db file, tables and insert rows from sql file
sqlite3 create-from-sql-file.db < sql-file.sql

# log the content
sqlite3 create-from-sql-file.db "SELECT * FROM episodes"