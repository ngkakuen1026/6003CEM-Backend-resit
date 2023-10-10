export const applications = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/applications",
  "description": "An online application in a new online book store",
  "type": "object",
  "properties": {
    "application_id": {
      "description": "ID of the application",
      "type": "integer"
    },
    "user_id": {
      "description": "ID of the user associated with the application",
      "type": "integer"
    },
    "status": {
      "description": "Status of the application",
      "type": "string",
      "default": "new"
    },
    "name": {
      "description": "Name of the applicant",
      "type": "string"
    },
    "email": {
      "description": "Email of the applicant",
      "type": "string",
      "format": "email"
    },
    "phone": {
      "description": "Phone number of the applicant",
      "type": "string",
      "maxLength": 20
    },
    "address": {
      "description": "Address of the applicant",
      "type": "string"
    },
    "application_content": {
      "description": "Content of the application",
      "type": "string"
    }
  },
  "required": ["application_id", "name", "email"]
}