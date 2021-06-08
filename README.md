# EXPRESS todo api

## How to run

```
node src
```

## End points

### Login
```
POST http://localhost:3001/login
Content-Type: application/json

{
    "username": "steve",
    "password": "wonder321"
}
```

### Valid token
```
POST http://localhost:3001/valid
Content-Type: application/json
Authorization: Bearer {{login.response.body.accessToken}}
```

### Get All ToDo Items
```
GET http://localhost:3001/
Content-Type: application/json
Authorization: Bearer {{login.response.body.accessToken}}
```

### Create new todo item
```
POST http://localhost:3001/
Content-Type: application/json
Authorization: Bearer {{login.response.body.accessToken}}

{
    "title": "Create a new task",
    "status": "unchecked"
}
```
### Update todo item 
```
PUT http://localhost:3001/todo_item.id
Content-Type: application/json
Authorization: Bearer {{login.response.body.accessToken}}

{
     "status": "checked"
}
```
### Delete todo item
```
DELETE  http://localhost:3001/todo_item.id
Authorization: Bearer {{login.response.body.accessToken}}
```