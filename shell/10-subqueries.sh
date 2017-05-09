#!/usr/bin/env bash

# infos here
# http://www.sqlitetutorial.net/sqlite-subquery/

# subqueries are select statements within select statements. They are also called subselects.
# subqueries are useful in many ways, they work anywhere normal expressions work, and they can 
# therefore be used in a variety of places in a select statement.

# perhaps the most common use of subqueries is `in the where clause, specifically using the in operator.
# the `in` operator is a binary operator that takes an input value and a list of values and returns 
# true if the input value exists in the list, or false otherwise

# show all the `food_types`
sqlite3 foods.db <<!
.header on
.mode column
select * from foods where type_id in (1,2);
!

echo
# the same result as below but using a subquery `in (select ...)`
sqlite3 foods.db <<!
.header on
.mode column
select * from foods where type_id in (select id from food_types where name='Bakery' or name='Cereal');
!



# subqueries `in the select clause` can be used to add additional data from other tables 
# to the result set. For example, to get the number of episodes each food appears in, the 
# actual count from foods_episodes


echo
# display food `Bear Claws`, his `food_id` is 4
sqlite3 foods.db <<!
.header on
.mode column
select * from foods where name like 'Bear%';
!

echo
# now show all `foods_episodes` whith `Bear Claws` (search by `food_id`), there is 3 episodes
sqlite3 foods.db <<!
.header on
.mode column
select * from foods_episodes where food_id=4;
!

echo
# subquery: show food names and show count of episodes where this food appear
# And `Bear Claws` is 3... so the subquery works
sqlite3 foods.db <<!
.header on
.mode column
select name, (select count(*) from foods_episodes where food_id=f.id) count
from foods f limit 10;
!



# finally, we have `the from clause`
# there may be times when you want to join to the results of another query, rather than to a base table.

echo
# display all food_types (Dip has id 6)
sqlite3 foods.db <<!
.header on
.mode column
select * from food_types;
!

echo
# display all foods with Dip type (type_id = 6)
# show `Generic (as a meal)` `Good Dip` `Guacamole Dip` `Hummus`
sqlite3 foods.db <<!
.header on
.mode column
select * from foods where type_id = 6;
!


echo
# subquery: show food names and his food_type name of all Dip (type_id = 6)
sqlite3 foods.db <<!
.header on
.mode column
select f.name, types.name from foods f
inner join (select * from food_types where id=6) types
on f.type_id=types.id;
!


