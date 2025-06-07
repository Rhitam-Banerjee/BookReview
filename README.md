<h1 align="center">BookReview</h3>
<div align="center">
Book Review Application is created to keep track of books which are liked by users and to keep track of most reviewed book. It stores book data with name, author and genre, logged in users can add, update or delete their review.
</div>

## 📋 <a name="table">Table of Contents</a>

1. ⚙️ [Tech Stack](#tech-stack)
2. 🤸 [Project Setup](#setup)
3. 🕸️ [PostMan Setup (Code to Copy)](#postmanconfig)
4. 🔗 [Postman Example](#postmanexample)
5. 🚀 [Schema Design](#schema)

## <a name="tech-stack">⚙️ Tech Stack</a>
- Node.JS
- Express.JS
- MongoDB
- JWT
- Bcrypt
- DotEnv

  
## <a name="setup">🤸 Project Setup</a>

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/) ( Optional if DB is setup in MongoDB Atlas )

**Cloning the Repository**

```bash
git clone https://github.com/Rhitam-Banerjee/BookReview.git
cd BookReview
```
**Create .env file**

<details>
<summary><code>.env</code></summary>

```.env
PORT=3000
JWT_SECRET={{Secret Key}}
MONGO_URI={{MONGODB URL}}
```
</details>

Replace the {{Secret Key}} with your own JWT secret code and {{MONGODB URL}} with MongoDB url which can be stored locally or Atlas

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
node --run run
```
## <a name="postmanconfig">🕸️ PostMan Setup</a>
<details>
<summary><code>Postman Collection</code></summary>

```json
{
  "info": {
    "name": "Book Review API",
    "_postman_id": "b1e8ecbe-a1dd-4e65-94d9-024d0fdf11b1",
    "description": "Sample API for Book Reviews",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth - Signup",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"123456\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/signup",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["signup"]
        }
      },
      "response": []
    },
    {
      "name": "Auth - Login",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"123456\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["login"]
        }
      },
      "response": []
    },
    {
      "name": "Books - Add Book",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}",
            "type": "text"
          },
          {
            "key": "Content-Type",
            "value": "application/json",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"The Great Gatsby\",\n  \"author\": \"F. Scott Fitzgerald\",\n  \"genre\": \"Fiction\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/books",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["books"]
        }
      },
      "response": []
    },
    {
      "name": "Books - Get All",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/books?page=1&limit=10",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["books"],
          "query": [
            {
              "key": "page",
              "value": "1"
            },
            {
              "key": "limit",
              "value": "10"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "Books - Get by ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/books/{{bookId}}",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["books", "{{bookId}}"]
        }
      },
      "response": []
    },
    {
      "name": "Books - Search",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/books/search?q=Gatsby",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["books", "search"],
          "query": [
            {
              "key": "q",
              "value": "Gatsby"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "Review - Add Review",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}",
            "type": "text"
          },
          {
            "key": "Content-Type",
            "value": "application/json",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"rating\": 5,\n  \"comment\": \"Excellent read!\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/books/{{bookId}}/reviews",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["books", "{{bookId}}", "reviews"]
        }
      },
      "response": []
    },
    {
      "name": "Review - Update Review",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}",
            "type": "text"
          },
          {
            "key": "Content-Type",
            "value": "application/json",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"rating\": 4,\n  \"comment\": \"Changed my mind, still good.\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/reviews/{{reviewId}}",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["reviews", "{{reviewId}}"]
        }
      },
      "response": []
    },
    {
      "name": "Review - Delete Review",
      "request": {
        "method": "DELETE",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}",
            "type": "text"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/reviews/{{reviewId}}",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["reviews", "{{reviewId}}"]
        }
      },
      "response": []
    }
  ],
  "event": [],
  "variable": [
    {
      "key": "token",
      "value": ""
    },
    {
      "key": "bookId",
      "value": ""
    },
    {
      "key": "reviewId",
      "value": ""
    }
  ]
}
```
</details>

## <a name="postmanexample">Postman Example</a>

Replace {{token}} with JWT token in the Authorization header
<details>
  <summary>
    <code>POST /signup</code>
  </summary>
  
  ```json
      {
      "email": "rhitam@banerjee.com",
      "password": "rhitam"
      }
  ```
response generates JWT auth token
<details>
  <summary>
    <code>example</code>
  </summary>
    
  ```json
      
    req
    {
      "email": "banerjee@banerjee.com",
      "password": "rhitam"
    }
    res
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDNlMTFkzBlYmZiNDZlNDE5YjA1MCIsImlhdCI6MTc0OTI3OTAwNSwiZXhwIjoxNzQ5MzY1NDA1fQ.hwYZOHoAAKXFnvf-iMm6iWlezA-CL1m4TMkrHfQiUl"
    }
  ```
</details>
</details>
<details>
  <summary>
    <code>POST /books</code>
  </summary>
  In Header
  Remove {{token}} and add the authorisation token generated by jwt
  
  ```text 
  
    Authorization: Bearer {{token}} 
  ```
In Body
  ```json
      {
        "title": "Harry Potter",
        "author": "JK Rowling",
        "genre": "Wizard"
      }
  ```
<details>
  <summary>
    <code>example</code>
  </summary>
    
  ```json
      
    req
    {
      "title": "Harry Potter: Order of Phoenix",
      "author": "JK Rowling",
      "genre": "Wizard"
    }
    res
    {
      "title": "Harry Potter: Order of Phoenix",
      "author": "JK Rowling",
      "genre": "Wizard",
      "reviews": [],
      "_id": "6843e6d8ec5409ac2c571580",
      "__v": 0
    }
  ```
</details>
</details>
<details>
  <summary>
    <code>POST /books/{{bookId}}/reviews</code>
  </summary>
  In Header
  Remove {{token}} and add the authorisation token generated by jwt
  
  ```text 
  
    Authorization: Bearer {{token}} 
  ```
In Body
  ```json
      {
        "rating": 5,
        "comment": "Excellent read!"
      }
  ```
</details>
<details>
  <summary>
    <code>PUT /reviews/{{reviewId}}</code>
  </summary>
  In Header
  Remove {{token}} and add the authorisation token generated by jwt
  
  ```text 
  
    Authorization: Bearer {{token}} 
  ```
In Body
  ```json
      {
        "rating": 5,
        "comment": "Excellent read!"
      }
  ```
</details>
<details>
  <summary>
    <code>PUT /reviews/{{reviewId}}</code>
  </summary>
  In Header
  Remove {{token}} and add the authorisation token generated by jwt
  
  ```text 
  
    Authorization: Bearer {{token}} 
  ```
</details>

## <a name="schema">🚀 Schema Design</a>

<details> <summary><code>Schema Overview</code></summary>
  
```text
  
    User
    ├── email: String (required, unique)
    ├── password: String (required, hashed)
    
    Book
    ├── title: String (required)
    ├── author: String (required)
    ├── genre: String (required)
    ├── reviews: [ObjectId] (ref: Review)
    
    Review
    ├── book: ObjectId (ref: Book, required)
    ├── user: ObjectId (ref: User, required)
    ├── rating: Number (min: 1, max: 5)
    ├── comment: String (optional)
    ├── createdAt: Date (auto-generated)
    ├── updatedAt: Date (auto-generated)
```
Relationships
- User ⇄ Review: One-to-many (a user can write many reviews).
- Book ⇄ Review: One-to-many (a book can have many reviews).
</details>
