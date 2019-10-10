# Records
참가자(member)의 기록(record) 관련 API 입니다.

## The record object
| name | type | description |
| --- | --- | --- |
| competitionId | string | competition identifier |
| teamId | string | team identifier |
| memberId | string | member identifier |
| round | number | round of event |
| runningTime | number | running time in seconds |
| sitUpCount | number | sit up total count |
| pushUpCount | number | push up total count |

## Create Record
Create team member's record

### Endpoints
`POST /competitions/:competitionId/teams/:teamId/record`

### Path Variables
| name | type | description |
| --- | --- | --- |
| competitionId | string | (**required**) competition identifier |
| teamId | string | (**required**) team identifier |

### Body Parameters
| name | type | description |
| --- | --- | --- |
| memberId | string | (**required**) member identifier |
| round | number | (**required**) round of event |
| runningTime | number | (**required**) in seconds |
| sitUpCount | number | (**required**) sit up total count |
| pushUpCount | number | (**required**) push up total count |

### Request Example

```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "memberId": "1",
      "round": 1,
      "runningTime": 1110,
      "sitUpCount": 56,
      "pushUpCount": 80,
    }'
     "http://{end-point}/competitions/1/teams/a1b2c3d4/record"
```

### Response
Created record object on success, or error on failure.

### Response Example
``` json
{
  "competitionId": "1",
  "teamId": "1",
  "memberId": "1",
  "round": 1,
  "runningTime": 1110,
  "sitUpCount": 56,
  "pushUpCount": 80,
}
```

## Update Record
Update team member's record

### Endpoints
`PATCH /competitions/:competitionId/teams/:teamId/record`

### Path Variables
| name | type | description |
| --- | --- | --- |
| competitionId | string | (**required**) competition identifier |
| teamId | string | (**required**) team identifier |

### Body Parameters
| name | type | description |
| --- | --- | --- |
| memberId | string | (**required**) member identifier |
| round | number | (**required**) round of event |
| runningTime | number | running time in seconds |
| sitUpCount | number | sit up total count |
| pushUpCount | number | push up total count |

### Request Example

```sh
curl -X PATCH
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "memberId": "1",
      "round": 1,
      "sitUpCount": 70,
    }'
     "http://{end-point}/competitions/1/teams/a1b2c3d4/record"
```

### Response
Updated record object on success, or error on failure.

### Response Example
``` json
{
  "competitionId": "1",
  "teamId": "1",
  "memberId": "1",
  "round": 1,
  "runningTime": 1110,
  "sitUpCount": 70,
  "pushUpCount": 80,
}
```