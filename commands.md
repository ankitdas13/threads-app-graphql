## Show all running container
docker ps

## Access container
docker exec -it <Container Id> bash

## user name
su postgres

## List available databases

postgres=#  \l

output : 

 List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    | ICU Locale | Locale Provider |   Access privileges
-----------+----------+----------+------------+------------+------------+-----------------+-----------------------
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
           |          |          |            |            |            |                 | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            | =c/postgres          +
           |          |          |            |            |            |                 | postgres=CTc/postgres
 threads   | postgres | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |

## Switch connection to a new database

postgres=#  \c threads

output : You are now connected to database "threads" as user "postgres".

## List available tables
threads=# \d

output:

               List of relations
 Schema |        Name        | Type  |  Owner   
--------+--------------------+-------+----------
 public | _prisma_migrations | table | postgres
 public | users              | table | postgres


## expanded display cmd
threads=# \x
Expanded display is on.


threads=# select * from users;
-[ RECORD 1 ]-----+-------------------------------------
id                | 6265a14a-6573-4300-b829-0a20a910c5f0
first_name        | ankit
last_name         | das
profile_image_url |
email             | ankitdas@example.com
password          | 1234
salt              | testing_salt








## prisma schema migration

npx prisma migrate dev --name create_user_table