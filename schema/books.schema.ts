export const book = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/book",
  "description": "A book in a new online book store",
  "type": "object",
  "properties": {
    "book_id": {
      "description": "ID of the book",
      "type": "integer"
    },
    "title": {
      "description": "Title of the book",
      "type": "string"
    },
    "author": {
      "description": "Author of the book",
      "type": "string"
    },
    "genre": {
      "description": "Genre of the book",
      "type": "string"
    },
    "description": {
      "description": "Description of the book",
      "type": "string"
    },
    "publication_date": {
      "description": "Publication date of the book",
      "type": "string",
      "format": "date"
    }
  },
  "required": ["book_id", "title", "author", "description", "publication_date"]
}