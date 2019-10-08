# Teams
대회(Competition)에 참여한 team 관련 API입니다.

## The team object
| name | type | description |
| --- | --- | --- |
| id | string | team identifier |
| competitionId | string | competition identifier |
| name | string | team name |
| city | string | the city that team belong to |
| members | array | List of team `member`s |

## The member object
| name | type | description |
| --- | --- | --- |
| id | string | member's identifier for competition |
| name | string | member's name |

## Create team (= Register Team)
Register a team for the competition by creating a team

### Endpoints
`POST /competitions/:competitionId/teams`

### Path Variables
| name | type | description |
| --- | --- | --- |
| competitionId | string | (**required**)competition identifier |

### Body Parameters
| name | type | description |
| --- | --- | --- |
| name | string | (**required**) team name |
| city | string | (**required**) the city that team belong to |
| members | array | (**required**) list of team member's name. The number of members should be **5**.|

### Request Example

```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "name": "FIFL",
      "city": "Seoul",
      "members": ["차민철", "홍길동", "최준영", "김지헌", "김아라"],
    }'
    "http://{end-point}/competitions/1/teams"
```

### Response
Created team object on success, or error on failure.

### Response Example
``` json
{
  "id": "1a2b3c4d",
  "competitionId": "1",
  "name": "FIFL",
  "city": "Seoul",
  "members" : [
    {
      "id": "1",
      "name": "차민철",
    },
    {
      "id": "2",
      "name": "홍길동",
    },
    {
      "id": "3",
      "name": "최준영",
    },
    {
      "id": "4",
      "name": "김지헌",
    },
    {
      "id": "5",
      "name": "김아라",
    },
  ],
}
```
