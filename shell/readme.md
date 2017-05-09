# sqlite-test shell

## 1-create-from-shell-script

```
npm run s1
```

```
sqlite3 create-from-shell-script.db <<!
CREATE TABLE episodes (id integer primary key, season int, name text );
INSERT INTO episodes VALUES(0, NULL, 'Good News Bad News');
INSERT INTO "episodes" VALUES(1, 1, 'Male Unbonding');
insert into "episodes" values(2, 1, 'The Stake Out');
!
```

```
0||Good News Bad News
1|1|Male Unbonding
2|1|The Stake Out
```

## 2-create-from-sql-file

```
npm run s2
```

```
sqlite3 create-from-sql-file.db < sql-file.sql
```

```
BEGIN TRANSACTION;
CREATE TABLE episodes (
  id integer primary key,
  season int,
  name text );
INSERT INTO "episodes" VALUES(0, NULL, 'Good News Bad News');
INSERT INTO "episodes" VALUES(1, 1, 'Male Unbonding');
INSERT INTO "episodes" VALUES(2, 1, 'The Stake Out');
-- ...
COMMIT;
```

```
0||Good News Bad News
1|1|Male Unbonding
2|1|The Stake Out
# ...
```

## 3-create-from-csv-file

```
npm run s3
```

```
sqlite3 create-from-csv-file.db <<!
.mode csv
CREATE TABLE episodes (id integer primary key, season int, name text );
.import csv-file.csv episodes
!
```

```
0||Good News Bad News
1|1|Male Unbonding
2|1|The Stake Out
# ...
```

## 4-export-a-sql-dump

```
npm run s4
```

```
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
```

```
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE foods(
  id integer primary key,
  type_id integer,
  name text );
INSERT INTO foods VALUES(1,1,'Bagels');
INSERT INTO foods VALUES(2,1,'Bagels, raisin');
INSERT INTO foods VALUES(3,1,'Bavarian Cream Pie');
# ...
```

## 5-select-like-glob

```
npm run s5
```

```
sqlite3 foods.db <<!
.header on
.mode column
select id, name from foods where name like 'j%';
!
```

```
id          name      
----------  ----------
156         Juice box 
236         Jucyfruit 
243         Jello with
244         JujyFruit 
245         Junior Min
370         Jambalaya
```

## 6-select-order-by

```
npm run s6
```

```
sqlite3 foods.db <<!
.headers on
.mode column
select id, name from foods where name like 'b%' order by name desc;
!
```

```
id          name         
----------  -------------
7           Butterfingers
109         Butter       
216         Bubble Gum   
63          Broiled Chick
385         Brocolli     
329         Brisket Sandw
276         Brisket
# ...
```

## 7-limit-offset

```
npm run s7
```

```
sqlite3 foods.db <<!
.header on
.mode column
select id, name from foods where name like 'c%' order by name limit 10 offset 2;
!
```

```
id          name       
----------  -----------
217         Candy Apple
193         Canned Frui
310         Canolli    
194         Cantaloupe 
8           Carrot Cake
363         Carrot Soup
387         Carrots    
218         Cashew Nuts
219         Cashews (ba
64          Casserole
```

## 8-functions-group-by

```
npm run s8
```

```
sqlite3 foods.db <<!
.header on
.mode column
select season, count(*) from episodes group by season;
!
```

```
season      count(*)  
----------  ----------
            2         
1           4         
2           13        
3           22        
4           24        
5           22        
6           24        
7           24        
8           22        
9           24
```

## 9-join

```
npm run s9
```

```
sqlite3 foods.db <<!
.header on
.mode column
select * from foods inner join food_types on foods.type_id=food_types.id limit 50;
!
```

```
id          type_id     name        id          name      
----------  ----------  ----------  ----------  ----------
1           1           Bagels      1           Bakery    
2           1           Bagels, ra  1           Bakery    
3           1           Bavarian C  1           Bakery    
4           1           Bear Claws  1           Bakery    
5           1           Black and   1           Bakery    
6           1           Bread (wit  1           Bakery    
7           1           Butterfing  1           Bakery    
8           1           Carrot Cak  1           Bakery    
9           1           Chips Ahoy  1           Bakery    
10          1           Chocolate   1           Bakery
# ...
```

## 10-subqueries

```
npm run s10
```

```
sqlite3 foods.db <<!
.header on
.mode column
select f.name, types.name from foods f
inner join (select * from food_types where id=6) types
on f.type_id=types.id;
!
```

```
f.name               types.name
-------------------  ----------
Generic (as a meal)  Dip       
Good Dip             Dip       
Guacamole Dip        Dip       
Hummus               Dip
```

## 11-conditional-result

```
npm run s11
```

```
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
```

```
id          type_id     name        good or bad
----------  ----------  ----------  -----------
1           1           Bagels      good       
2           1           Bagels, ra  good       
3           1           Bavarian C  bad        
4           1           Bear Claws  bad        
5           1           Black and   bad        
6           1           Bread (wit  bad        
7           1           Butterfing  bad        
8           1           Carrot Cak  bad        
9           1           Chips Ahoy  bad        
10          1           Chocolate   good
# ...
```

## 12-update-delete

```
npm run s12
```

```
sqlite3 update-delete.db <<!
update episodes set id=11 where name='Male Unbonding';
update episodes set name='Honey Mustard', season=3 where id=2;
insert into episodes values(129,7,'The Calzone');
!
```

```
0||Good News Bad News
2|3|Honey Mustard
11|1|Male Unbonding
129|7|The Calzone
```

## 13-integrity

```
npm run s13
```

```
sqlite3 integrity-check.db <<!
create table contacts (
  id integer primary key,
  name text not null collate nocase,
  phone text not null default 'UNKNOWN',
  unique (name,phone),
  check (length(phone)>=7) );
insert into "contacts" values(1, 'John Doe', 12345678);
insert into "contacts" values(2, 'Steve Dude', 123456);
!
```

```
1|John Doe|12345678
Error: near line 8: UNIQUE constraint failed: contacts.name, contacts.phone
```