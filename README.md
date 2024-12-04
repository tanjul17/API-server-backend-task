# E-Commerce API Server (TypeScript)

## Description

This project demonstrates an API server built using TypeScript for a small e-commerce platform. The server manages users, products, and orders, supporting essential functionalities like data creation, updates, retrieval, and complex queries. Authentication is excluded to maintain simplicity.

---

## Features

- **Users**: Store information including name, email, and phone number.
- **Products**: Manage products with attributes like name, category, price, and stock quantity.
- **Orders**: Track orders with details such as the user who placed the order, the product ordered, the quantity, and the order date.
- **Custom Queries**: 
  - Retrieve orders placed in the last 7 days.
  - Get orders of a specific user.
  - Identify users who bought a specific product.
  - Calculate the total stock quantity of all products combined.

---

## Project Structure

1. **Models**:
   - **User Model**: Stores user data (name, email, phone).
   - **Product Model**: Stores product details (name, category, price, stockQuantity).
   - **Order Model**: Tracks orders and references `User` and `Product` models.

2. **Controllers**:
   - Handle logic for creating, updating, and retrieving users, products, and orders.
   - Include validation and error handling for requests.

3. **Routes**:
   - Define endpoints for users, products, and orders.
   - Include additional routes for custom queries.

4. **Database**:
   - MongoDB is used to store data.
   - Collections include `users`, `products`, and `orders`.

5. **Server**:
   - Built using Express.js, with TypeScript ensuring type safety and maintainability.
   - Middleware for request parsing and error handling.

---

## Endpoints

### User Management
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update user details.
- `GET /api/users`: Retrieve all users.
- `GET /api/users/:id`: Retrieve a specific user.

### Product Management
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update product details.
- `GET /api/products`: Retrieve all products.
- `GET /api/products/:id`: Retrieve a specific product.

### Order Management
- `POST /api/orders`: Create a new order.
- `PUT /api/orders/:id`: Update an existing order.
- `GET /api/orders`: Retrieve all orders.
- `GET /api/orders/:id`: Retrieve a specific order.

### Additional Queries
- `GET /api/orders/recent`: Retrieve orders placed in the last 7 days.
- `GET /api/orders/user/:userId`: Retrieve orders of a specific user.
- `GET /api/products/users/:productId`: Retrieve users who bought a specific product.
- `GET /api/products/total-stock`: Retrieve the total stock quantity for all products.

---

## Handling Stock Updates

### Scenario
When an order is placed, the stock quantity of the ordered product must be updated.

### Suggested Approaches
1. **Immediate Update**:
   - Deduct the stock quantity directly in the same transaction when the order is created.
   - Ensures consistency and accurate stock values in real time.

2. **Deferred Update**:
   - Use a background task or queue system to update stock after the order is processed.
   - Reduces blocking and improves performance for high-traffic systems.

---

## Evaluation Criteria

- **Correctness**: API functionality must align with the requirements.
- **Schema Design**: Database schema should be simple, normalized, and efficient for the use case.
- **Indexing**: Implement basic indexing to optimize query performance.
- **Code Quality**: Ensure clean, modular, and well-documented code with meaningful commits.

---

## Notes

This project is a demonstration of TypeScript, MongoDB, and Express.js integration for building scalable and maintainable API servers.
