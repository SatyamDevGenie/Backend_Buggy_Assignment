# Backend Debugging Assignment

## Candidate

**Satyam Sawant**

## Technology Stack

* Node.js
* Express.js
* JavaScript (CommonJS)
* Nodemon

---

# Assignment Overview

This assignment involved analyzing an existing Express.js backend application, identifying bugs, fixing runtime issues, correcting logical errors, improving validations, and ensuring all API endpoints function correctly.

The original code contained multiple issues including:

* Undefined variables
* Missing return statements
* Typographical errors
* Assignment operators used instead of comparison operators
* Incorrect authentication logic
* Route parameter type mismatches
* Missing input validations
* Improper function usage
* Missing error handling

All identified issues were fixed and tested successfully.

---

# Project Setup

## Install Dependencies

```bash
npm install
```

## Run Application

```bash
npm start
```

## Development Mode

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

---

# Bugs Identified and Fixed

---

## 1. Undefined Variable in GET /users

### Original Code

```js
res.send(userList);
```

### Problem

`userList` variable was not defined.

### Fix

```js
res.status(200).json(users);
```

---

## 2. Route Parameter Type Mismatch

### Original Code

```js
const id = req.params.id;
users.find(u => u.id === id);
```

### Problem

Route parameters are strings while IDs were numbers.

### Fix

```js
const id = Number(req.params.id);
```

Applied to:

* GET /users/:id
* DELETE /notes/:id
* GET /profile/:id
* GET /user-notes/:userId

---

## 3. Missing Return Statement

### Original Code

```js
function getUserById(id) {
  const user = users.find(u => u.id === id);
}
```

### Problem

Function always returned undefined.

### Fix

```js
function getUserById(id) {
  return users.find(u => u.id === id);
}
```

---

## 4. Typographical Error

### Original Code

```js
notes.lenght
```

### Problem

Incorrect property name.

### Fix

```js
notes.length
```

---

## 5. Undefined Function

### Original Code

```js
fetchExternalData();
```

### Problem

Function did not exist.

### Fix

Implemented:

```js
async function fetchExternalData() {
  return {
    success: true,
    message: "External data fetched successfully"
  };
}
```

---

## 6. Assignment Operator Used Instead of Comparison

### Original Code

```js
if (notes = [])
```

### Problem

Overwrites array and always evaluates incorrectly.

### Fix

```js
if (notes.length === 0)
```

---

## 7. Decimal ID Generation

### Original Code

```js
Math.random() * 1000
```

### Problem

Generated decimal values.

### Fix

```js
Math.floor(Math.random() * 100000)
```

---

## 8. Function Reference Stored Instead of Function Call

### Original Code

```js
const newId = generateNoteId;
```

### Problem

Stored function reference.

### Fix

```js
id: generateNoteId()
```

---

## 9. Missing Request Validation

### Original Code

```js
if (!title && !content)
```

### Problem

Allowed partial data.

### Fix

```js
if (!title || !content || !userId)
```

---

## 10. Missing User Validation Before Note Creation

### Added Validation

```js
const user = getUserById(Number(userId));

if (!user) {
  return res.status(404).json({
    message: "User does not exist"
  });
}
```

---

## 11. Delete Endpoint Bug

### Original Code

```js
notes.splice(noteIndex, 1);
```

### Problem

If noteIndex was -1, last element would be deleted.

### Fix

```js
if (noteIndex === -1) {
  return res.status(404).json({
    message: "Note not found"
  });
}
```

---

## 12. Undefined Variable During User Update

### Original Code

```js
user.name = username;
```

### Problem

username variable was undefined.

### Fix

```js
user.name = name;
```

---

## 13. Filter Assignment Bug

### Original Code

```js
notes.filter(n => n.userId = userId);
```

### Problem

Assignment operator used.

### Fix

```js
notes.filter(n => n.userId === userId);
```

---

## 14. Authentication Logic Error

### Original Code

```js
if(email === "admin@test.com" || password === "123456")
```

### Problem

Login succeeded if only email OR password matched.

### Fix

```js
if(
  email === "admin@test.com" &&
  password === "123456"
)
```

---

## 15. Incorrect Use of filter()

### Original Code

```js
const user = users.filter(...)
```

### Problem

filter() returns array.

### Fix

```js
const user = users.find(...)
```

---

## 16. Missing Async Await

### Original Code

```js
const data = fetchExternalData();
```

### Problem

Returned Promise object.

### Fix

```js
const data = await fetchExternalData();
```

---

## 17. String Concatenation Issue in Sum API

### Original Code

```js
const total = a + b;
```

### Problem

Strings would concatenate.

Example:

```js
"10" + "20"
```

Output:

```js
1020
```

### Fix

```js
const total = Number(a) + Number(b);
```

---

## 18. Port Mismatch

### Original Code

```js
app.listen(3000)
console.log("Server running on port 5000")
```

### Problem

Incorrect logging.

### Fix

```js
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# API Endpoints

## Users

### Get All Users

```http
GET /users
```

### Get User By ID

```http
GET /users/:id
```

### Update User

```http
PUT /users/:id
```

Body:

```json
{
  "name": "Satyam"
}
```

---

## Notes

### Get All Notes

```http
GET /notes
```

### Get Notes Count

```http
GET /notes/count
```

### Create Note

```http
POST /notes
```

Body:

```json
{
  "title": "Learning Node",
  "content": "Express API",
  "userId": 1
}
```

### Delete Note

```http
DELETE /notes/:id
```

### Get Notes By User

```http
GET /user-notes/:userId
```

---

## Authentication

### Login

```http
POST /login
```

Body:

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

---

## Profile

### Get Profile

```http
GET /profile/:id
```

---

## External Data

### Fetch External Data

```http
GET /external-data
```

---

## Sum API

### Add Two Numbers

```http
POST /sum
```

Body:

```json
{
  "a": 10,
  "b": 20
}
```

---

# Improvements Added

* Added proper HTTP status codes
* Added route parameter type conversion
* Added validation for request bodies
* Added reusable helper function
* Added async error handling
* Added user existence validation
* Added note existence validation
* Added login validation
* Added clean JSON responses
* Added modular utility functions
* Improved code readability and maintainability

---

# Testing

The application was tested using:

* Postman
* Browser (GET routes)
* Manual API validation

All endpoints were verified for:

* Success responses
* Error responses
* Invalid inputs
* Missing resources
* Authentication validation

---

# Result

The application is now fully functional, free from runtime errors, and follows standard Express.js API development practices. The debugging process improved reliability, maintainability, validation, and overall code quality. I had done this assignment with proper honesty and taken little bit help of chat gpt. Thank you.
