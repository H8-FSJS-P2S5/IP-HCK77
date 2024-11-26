# PlotAlchemy API DOCUMENTATION

## EndPoints

List of available endpoints:

- `POST /register`
- `POST /login/google`
- `POST /login`
- `GET /genres`

Routes below need authentication:

- `POST /cauldrons/:cauldronId/potions`

Routes below need authorization:

> the request user must be owner of the product

- `PUT /profile/:userId`
- `PATCH /profile/:userId/profilePicture`
- `GET /cauldrons`
- `PUT /cauldrons/:cauldronId/potions/:potionId`
- `DELETE /cauldrons/:cauldronId/potions/:potionId`

## 1. POST /register

Description:

- Register a new user into the system

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (201 - Created)_

```json
{
  "id": "number",
  "email": "string"
}
```

## 2. POST /login/google

Description:

- Login a user into the system using Google Open Auth

Request:

- body:

```json
{
  "access_token_google": "string (required)"
}
```

_Response (200 - Success)_

```json
{
  "access_token": "<access_token>"
}
```

## 3. POST /login

Description:

- Login into the system

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (200 - Success)_

```json
{
  "access_token": "<access_token>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 4. GET /genres

Description:

- show list of recommendation according to genres

Request:

_Response (200 - Success)_

```json
{
  "genres": "array"
}
```

## 5. POST /cauldrons/:cauldronId/potions

Description:

- add potions to user cauldron

Request:

- params:

```json
{
  "cauldronId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "recommendation": "string",
  "GenreId": "number"
}
```

_Response (201 - Created)_

```json
{
  "id": "number",
  "recommendation": "string",
  "GenreId": "number",
  "CauldronId": "number"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Cauldron not found"
}
```

## 6. PUT /profile/:userId

Description:

- update user profile

Request:

- params:

```json
{
  "userId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "fullName": "string",
  "profilePicture": "string"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully update profile"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Profile Not Found"
}
```

## 7. PATCH /profile/:userId/profilePicture

Description:

- upload and update profile picture

Request:

- params:

```json
{
  "id": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>",
  "Content-Type": "multipart/form-data"
}
```

- body:

```json
{
  "image": "file"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully Update Profile Picture"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Profile Not Found"
}
```

## 8. GET /cauldrons

Description:

- get user cauldron

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - Success)_

```json
{
  "cauldron": "array <cauldron>"
}
```

## 9. PUT /cauldrons/:cauldronId/potions/:potionId

Description:

- update delete user potion (recommendation) by potionId

Request:

- params:

```json
{
  "cauldronId": "number (required)",
  "potionId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "recommendation": "string",
  "GenreId": "number"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully update potion with ID: <potionId>"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Error potion with ID: <id> not found"
}
```

## 10. DELETE /cauldrons/:cauldronId/potions/:potionId

Description:

- delete user potion (recommendation) by potionId

Request:

- params:

```json
{
  "cauldronId": "number (required)",
  "potionId": "number (required)"
}
```

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully delete potion"
}
```

## Global Error Response

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
