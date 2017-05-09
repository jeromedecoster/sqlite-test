#!/usr/bin/env bash

# joining tables by relation...
# Joins are the key to working with data from multiple tables (or relations)
# and are the first operation(s) of the select command

# show all the `food_types`
sqlite3 foods.db <<!
.header on
.mode column
select * from food_types;
!

echo
# show the first 10 foods entries. display `type_id` and `name`
# `type_id` is related to food_types.id
sqlite3 foods.db <<!
.header on
.mode column
select * from foods limit 10;
!

# any value in the foods.type_id column must correspond to a value in the food_types.id column, 
# and the id column is the `primary key` of food_types.
# the foods.type_id column, by virtue of this relationship, is called a `foreign key`: it 
# contains (or references) values in the primary key of another table.
# this relationship is called a `foreign key relationship

# natural joins...

echo
# show the 50 first foods name entries and associate it with his food_type
sqlite3 foods.db <<!
.header on
.mode column
select foods.name, food_types.name
  from foods, food_types
  where foods.type_id=food_types.id limit 50;
!



# inner joins...
# an inner join is where two tables are joined by a relationship between two columns in the tables,
# as in this previous example. It is the most common (and perhaps most generally useful) type of join.

echo
sqlite3 foods.db <<!
.header on
.mode column
select * from foods inner join food_types on foods.type_id=food_types.id limit 50;
!



echo
# natural joins again, but using alias
# show the 10 first foods name entries and associate it with his food_type
sqlite3 foods.db <<!
.header on
.mode column
select f.name, ft.name
  from foods f, food_types ft
  where f.type_id=ft.id limit 10;
!
