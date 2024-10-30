# Shopping Cart System API

This project is a Shopping Cart System built using Node.js, Express, MongoDB, and Redis. It allows users to manage products in a shopping cart, handle user authentication, and process checkouts.

## Table of Contents

- [Installation](#installation)
- [API Usage](#api-usage)
  - [User Endpoints](#user-endpoints)
  - [Product Endpoints](#product-endpoints)
  - [Carts Endpoints](#carts-endpoints)
- [Postman Collection](#postman-collection)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Olusegun-Light/Shopping-Cart-System-API.git

   ```

2. Navigate to the project directory:
   ```bash
   cd Shopping-Cart-System-API
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables in a `.env` file.
   ```env
   NODE_ENV=
   MONGO_URI=
   JWT_SECRET=
   JWT_EXPIRES_IN=
   JWT_COOKIE_EXPIRES_IN=
   REDIS_URL=
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Usage

### User Endpoints

- **Sign Up:** Create a new user account.

  - `POST /users/signup`

  **Request:**

  ```json
  {
    "name": "Olusegun Light",
    "email": "light@gmail.com",
    "password": "password",
    "passwordConfirm": "password"
  }
  ```

  **Response:**

  ```json
  {
    "status": "success",
    "token": "jwt-token",
    "data": {
      "user": {
        "id": "user-id",
        "name": "Olusegun Light",
        "email": "light@gmail.com",
        "role": "user"
      }
    }
  }
  ```

- **Log In:** Authenticate a user and obtain a JWT token.

  - `POST /users/login`

  **Request:**

  ```json
  {
    "email": "light@gmail.com",
    "password": "password"
  }
  ```

  **Response:**

  ```json
  {
    "status": "success",
    "token": "jwt-token",
    "data": {
      "user": {
        "id": "user-id",
        "name": "Olusegun Light",
        "email": "light@gmail.com"
      }
    }
  }
  ```

### Product Endpoints

- **Add Product:** Add a new product to the inventory.

  - `POST /products`

  **Request:**

  ```json
  {
    "name": "Products Name",
    "price": 1000,
    "stock": 9,
    "description": "Products description"
  }
  ```

  **Response**

  ```json
  {
    "status": "success",
    "message": "Product created successfully",
    "data": {
      "product": {
        "name": "Products Name",
        "description": "Products description",
        "price": 1000,
        "stock": 9,
        "_id": "6722681b24069cf86acc7c8e",
        "__v": 0
      }
    }
  }
  ```

- **Get Single Product:** Retrieve details of a specific product.

  - `GET /products/:id`

  **Response**

  ```json
  {
    "status": "success",
    "data": {
      "product": {
        "name": "Product Name",
        "description": "Product description",
        "price": 1000,
        "stock": 0,
        "_id": "67223846b25bf8b24eaa532a",
        "__v": 0
      }
    }
  }
  ```

- **Get All Products:** Retrieve details of all products.

  - `GET /products/`

  **Response**

  ```json
  {
    "status": "success",
    "data": {
      "products": [
        {
          "name": "Product Name",
          "description": "Product description",
          "price": 1000,
          "stock": 0,
          "_id": "67223846b25bf8b24eaa532a",
          "__v": 0
        }
      ]
    }
  }
  ```

- **Update Product:** Update the stock number of a specific product.

  - `POST /products/:id`

  **Request**

  ```json
  {
    "quantity": 5
  }
  ```

  **Response**

  ```json
  {
    "status": "success",
    "data": {
      "product": {
        "_id": "6722681b24069cf86acc7c8e",
        "name": "Products Name",
        "description": "Products description",
        "price": 1000,
        "stock": 4,
        "__v": 0
      }
    }
  }
  ```

### Carts Endpoints

- **Add to Cart:** Add a product to the user's shopping cart.

  - `POST /carts/:productId`

  **Request**

  ```json
  {
    "quantity": 2
  }
  ```

  **Response**

  ```json
  {
    "status": "success",
    "data": {
      "userId": "67224048dd8927160b011fde",
      "items": [
        {
          "productId": "6722681b24069cf86acc7c8e",
          "quantity": 1,
          "_id": "67226b8a24069cf86acc7cb1"
        }
      ],
      "_id": "67226b8a24069cf86acc7cb0",
      "__v": 0
    }
  }
  ```

- **Checkout:** Process the user's cart and complete the purchase.

  - `POST /carts/checkout`

  **Response**

  ``json
  {
  "message": "Checkout successful"
  }

- **Get Cart:** Retrieve the current user's shopping cart.

  - `GET /carts`

  **Response**

  ```json
  {
    "status": "success",
    "data": {
      "cart": {
        "_id": "67226b8a24069cf86acc7cb0",
        "userId": "67224048dd8927160b011fde",
        "items": [],
        "__v": 1
      }
    }
  }
  ```

## Postman Collection

You can explore and test the API endpoints using the provided Postman collection. The collection includes all the defined API routes along with example requests and responses.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://elements.getpostman.com/redirect?entityId=20337559-01b0fad7-ac2a-4925-ad76-c8e43bdc76a5&entityType=collection)

Click the "Run in Postman" button above to import the collection into your Postman workspace.
