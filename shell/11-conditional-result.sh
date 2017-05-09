#!/usr/bin/env bash

# infos here
# http://www.sqlitetutorial.net/sqlite-case/

# # the case expression allows you to handle various conditions within a select statement
# # case value
# #  when x then value_x
# #  when y then value_y
# #  when z then value_z
# #  else default_value
# # end

# show the foods with name starting with Piz or Pot
# the food.id are 35, 317, 318, 405, 406
sqlite3 foods.db <<!
.header on
.mode column
select * from foods where name glob 'Piz*' or name glob 'Pot*';
!

echo
# show the foods_episodes where the same food.id are found
# 35  (Pizza Bagels is found 1 time)
# 317 (Pizza are found 4 times)
sqlite3 foods.db <<!
.header on
.mode column
select * from foods_episodes where food_id in (35, 317, 318, 405, 406);
!


# case used in a subselect query to add frequency column
# if the count of food.id found is 1, `frequency` value is 'Low'
# if the count of food.id found is 4, `frequency` value is 'High'
echo
sqlite3 foods.db <<!
.header on
.mode column
select name,(select
               case
                 when count(*) > 4 then 'Very High'
                 when count(*) = 4 then 'High'
                 when count(*) in (2,3) then 'Moderate'
                 else 'Low'
               end
             from foods_episodes
             where food_id=f.id) frequency
from foods f
where name glob 'Piz*' or name glob 'Pot*';
!



echo
# show 30 first rows of foods
# add a 'good or bad' column with 'good' if food name starts with bagel or choco
# otherwise is bad 
sqlite3 foods.db <<!
.header on
.mode column
select *, case
  when foods.name glob 'Bagel*' then 'good'
  when foods.name glob 'Choco*' then 'good'
else 'bad'
  end 'good or bad'
from foods limit 30;
!