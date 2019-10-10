# Competitions
대회(Competition) 관련 API 입니다.

## The result object
| name | type | description |
| --- | --- | --- |
| id | string | competition identifier |
| teamScores | array | List of `teamScore`s |

## The teamScore object
| name | type | description |
| --- | --- | --- |
| teamId | string | team identifier |
| teamName | string | team name |
| score | number | team total score |
| grade | number | team grade |

## Get competition result
Get a result of competition

### Endpoints
`GET /competitions/:competitionId/result`

### Path Variables
| name | type | description |
| --- | --- | --- |
| competitionId | string | (**required**) competition identifier |

### Request Example

```sh
curl -X GET
     "http://{end-point}/competitions/1/result"
```

### Response
Retrieved result object on success, or error on failure.

### Response Example
``` json
{
  "competitionId": "1",
  "teamScores" : [
    {
      "teamId": "1",
      "teamName": "FIFL",
      "score": 500,
      "grade": 1,
    },
    {
      "teamId": "2",
      "teamName": "FIFL2",
      "score": 450,
      "grade": 2,
    },
  ],
}
```