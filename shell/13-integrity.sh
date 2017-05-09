#!/usr/bin/env bash

# infos here
# http://www.sqlitetutorial.net/sqlite-transaction/

# remove previous db
rm -f integrity.db integrity-transaction.db


# the unique constraint
# a unique constraint simply requires that all values in a column or a group of columns
# are distinct from one another or unique

# create a db file, a table... insert first row but not the 2nd
# Error: near line 7: UNIQUE constraint failed: contacts.name, contacts.phone
sqlite3 integrity.db <<!
create table contacts (
  id integer primary key,
  name text not null collate nocase,
  phone text not null default 'UNKNOWN',
  unique (name,phone) );
insert into "contacts" values(1, 'Bob Mould', 123456);
insert into "contacts" values(2, 'Bob Mould', 123456);
!

# log the content
sqlite3 integrity.db "SELECT * FROM contacts"



# the check constraint
# check constraints allow you to define expressions to test values whenever they are inserted
# into or updated within a column. If the values do not meet the criteria set forth in the 
# expression, the database issues a constraint violation.

# create a db file, a table... insert first row but not the 2nd
# Error: near line 8: CHECK constraint failed: contacts
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

echo
# log the content
sqlite3 integrity-check.db "SELECT * FROM contacts"



# the idea of atomic transaction: if something go wrong, nothing is done
# unfortunatly the transaction failed here, an error is raised... 
# Error: near line 8: UNIQUE constraint failed: contacts.name, contacts.phone
# ...but the first line is inserted. Holly shit.
sqlite3 integrity-transaction.db <<!
create table contacts (
  id integer primary key,
  name text not null collate nocase,
  phone text not null default 'UNKNOWN',
  unique (name,phone) );
BEGIN;
insert into "contacts" values(1, 'John Lennon', 123);
insert into "contacts" values(2, 'John Lennon', 123);
COMMIT;
!

echo
# log the content
sqlite3 integrity-transaction.db "SELECT * FROM contacts"