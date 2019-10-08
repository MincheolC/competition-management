# Installation
### Prerequisites
#### Mysql Server Start
```
$ mysql.server start
```
#### Create database
```sql
CREATE DATABASE [database_name] CHARACTER SET utf8 COLLATE utf8_general_ci;
```

#### Configure `rdb/config/config.json`.
```json
"development": {
    "username": "username",
    "password": "password",
    "database": "database name",
    "host": "host address",
    "dialect": "mysql"
},
```
#### Install node modules.
You should work on `schema/rdb` folder

```
$ cd schema/rdb
$ npm install
```

# Creation
#### Create Migration
```
$ npm run create:mig [migration_name]

(example)
$ npm run create:mig "create-table-member"
```
#### Deploy Migrations
```
npm run deploy:dev
```
#### Undo Migrations
```
npm run undo:dev
npm run undo:dev:all
```
# Schema
[DB diagram](https://dbdiagram.io/d/5d9c0217ff5115114db50219)