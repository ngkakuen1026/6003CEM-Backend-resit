export const user = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/user",
  "description": "An user in new book online store",
  "type": "object",
  "properties": {
    "user_id": {
      "description": "ID of the user",
      "type": "integer"
    },
    "username": {
      "description": "User name of the user",
      "type": "string"
    },
    "password": {
      "description": "Password of the user",
      "type": "string"
    },
    "email": {
      "description": "Email of the user",
      "type": "string"
    },
    "role": {
      "description": "Role of the user",
      "type": "string"
    }
  },
  "required": ["username", "password", "email"]
}