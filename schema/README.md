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

#### Configure `schema/rdb/config/config.json`.
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

# Migration
#### Deploy Migrations
```
npm run deploy:dev
```
#### Undo Migrations (주의. 초기 세팅 시에는 사용x)
생성한 테이블들을 다 지우는 방법
```
npm run undo:dev
npm run undo:dev:all
```
#### Deploy Seed
(**주의**) Seed는 해당 Table에 데이터가 없어야 정상적으로 들어감.
```
npm run deploy:dev:seed
```

# Schema
[DB diagram](https://dbdiagram.io/d/5d9c0217ff5115114db50219)