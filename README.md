# Competition-Management API Server
[![NPM Version](https://img.shields.io/badge/npm-v6.12.0-blue)](https://www.npmjs.com/)
[![Node Version](https://img.shields.io/badge/node-v10.15.3-green)](https://nodejs.org/ko/)

## Requirement
`competitionId`의 경우 따로 체크하지 않음. 동일하게 맞춰주기만 하면 됨.

1. [참가 신청을 할 수 있는 API](https://github.com/MincheolC/competition-management/blob/master/docs/teams.md#create-team--register-team)
2. [진행자가 각 참가자의 경기 결과를 기록할 수 있는 API](https://github.com/MincheolC/competition-management/blob/master/docs/records.md#create-record)
3. [진행자가 각 참가자의 경기 결과를 수정할 수 있는 API](https://github.com/MincheolC/competition-management/blob/master/docs/records.md#update-record)
4. [팀이 몇 점으로 몇 등했는지 확인 할 수 있는 API](https://github.com/MincheolC/competition-management/blob/master/docs/competitions.md#get-competition-result)

## Directory Sturture
- controllers/ - defines business logic of routes
- docs/ - REST API specification
- helpers/ - code and functionality to be shared by different parts of the project
- models/ - represents data and handles storage
- routes/ - defines the REST API (endpoints; URIs)
- schema/ - defines database migration
- tests/ - postman tests for REST API
- ${folders}/__test__/ – tests everything which is in the folders
## Installation
### Prerequisite
1. Node v10. 설치
2. Nodemon 설치
    ```sh
    $ npm install -g nodemon
    ```
3. Mysql 설치 및 실행
    ```sh
    $ brew install mysql
    $ mysql.server start
    ```

## How to Run
### Download
```sh
$ git clone https://github.com/MincheolC/competition-management.git
```

### Setting Database
[schema/README.md](https://github.com/MincheolC/competition-management/blob/master/schema/README.md#installation)를 참고하여 DB 세팅 (migraions and seeders)

### Install and Run
**다시 프로젝트 최상단 디렉토리로 이동**하여 node 패캐지 설치 후 실행
```sh
$ npm install
$ npm run dev

2019-10-11T04:02:49.849Z info: Competition Management API Server is listening on port 8081!
```
### Test
#### Lint code
```sh
$ npm run eslint
```
#### Unit test
```sh
$ npm run test
```
#### E2E Test
1. [Postman](https://www.getpostman.com) 설치
2. Postman 실행
3. Import `tests/Competition-management.postman_collection.json`
4. Run collections
   - (**주의**) 현재는 DB 세팅 및 서버 구동 후 1번 돌릴 수 있음. (Delete API들이 구현이 되어있지 않아 단발성 테스트)

