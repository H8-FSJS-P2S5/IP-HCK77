# PlotAlchemy API DOCUMENTATION

## EndPoints

List of available endpoints:

- `POST /register`
- `POST /login/google`
- `POST /login`
- `GET /pub/potions`
- `GET /pub/potions/:potionId`

Routes below need authentication:

- `POST /genres`
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

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
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

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
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

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 3. GET /pub/potions

Description:

- show list of some recommendation (as potions)

Request:

- query:

```json
{
  "filter": "number",
  "sort": "string (table column, add '-' to DESC)",
  "page[size]": "number",
  "page[number]": "number",
  "search": "string"
}
```

_Response (200 - Success)_

```json
{
  "potions": "array <list_of_potions>",
  "pagination": "object <pagination info>"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 4. GET /pub/potions/:potionId

Description:

- show potions by id

Request:

- params:

```json
{
  "potionId": "number (required)"
}
```

_Response (200 - Success)_

```json
{
  "potion": "object"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Error product with ID: <id> not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 5. POST /genres

Description:

- add a genre to the system

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string (required)"
}
```

_Response (201 - Created)_

```json
{
  "id": "number",
  "name": "string"
}
```

_Response (400 - Bad Request)_

````json
{
  "message": "Validation error messages"
}

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
````

## 6. POST /cauldrons/:cauldronId/potions

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

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 7. PUT /profile/:userId

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

_Response (201 - Create)_

```json
{
  "message": "Successfully update profile"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

++++++++++++++++++++++++++++++++++++++++++++++++++++++

## 8. PUT /products/:id

Description:

- update specific product

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
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string (required)",
  "description": "string",
  "price": "number (min: 1.000.000)",
  "stock": "number",
  "imgUrl": "string",
  "categoryId": "number (required)",
  "authorId": "number (required)"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully Update Product with ID: <id>",
  "updatedProduct": "<product_data>"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Error product with id: <id> not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 9. DELETE /products/:id

Description:

- delete specific product

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
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - Success)_

```json
{
  "message": "<product_name> success to delete"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Error product with id: <id> not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 10. PATCH /products/:id/imgUrl

Description:

- update image to specific product

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
  "message": "Image <product_name> success to update"
}
```

_Response (404 - Error not Found)_

```json
{
  "message": "Error product with id: <id> not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 11. GET /categories

Description:

- show all categories in the system

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
  "message": "Successfully Show All Categories",
  "categories": "<list_of_categories>"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 12. POST /categories

Description:

- add category to the system

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string (required)"
}
```

_Response (201 - Created)_

```json
{
  "message": "Successfully Add <category_name>",
  "category": "<category data>"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 13. PUT /categories/:id

Description:

- update category with specified id

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
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string (required)"
}
```

_Response (200 - Success)_

```json
{
  "message": "Successfully Edit Category with ID: <id>",
  "updatedCategory": "category_data"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error messages"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 15. GET /pub

Description:

- public home page

Request:

_Response (200 - Success)_

```json
{
  "message": "Access Success"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
