# NestJS-Task

##  Project Overview

This project is a RESTful API built with [NestJS](https://nestjs.com/), showcasing user management, authentication, role-based access control, and CRUD operations. It demonstrates how to implement the following features.

---

##  Features

###  User Management
- **Create User** – Register new users with validated input data.
- **Read Users** – Fetch individual or multiple user records.
- **Update User** – Update user information securely.
- **Delete User** – Remove user accounts with proper authorization checks.

###  Authentication
- **JWT Authentication** – Implements access tokens with Passport JWT strategy for secure API access.
- **Refresh Tokens** – Automatically issue new tokens to maintain user sessions without forcing frequent logins.
- **Session ID Handling** – Each login generates a unique session ID associated with the refresh token, enabling better token lifecycle management.
- **Sign Up / Sign In / Logout** – Cleanly implemented endpoints with proper request validation and response formatting.
- **Token Revocation on Logout** – Refresh tokens and session IDs are invalidated during logout to prevent unauthorized reuse.

###  Role-Based Access Control
Protect and control access to different parts of the API using role-based guards:

- **Role Decorator** – Easily define roles required to access specific endpoints.
- **User Roles** – Default roles like `user` and `admin` control access at various levels of the application.
- **Roles Guard** – Checks the requesting user's role against required roles for secure access to protected resources.- Restrict access to endpoints based on user roles (e.g., `user`, `admin`).

###  Validation
Ensure data integrity and security using a structured validation system:

- **DTOs (Data Transfer Objects)** – Define schemas for incoming data using TypeScript classes.
- **class-validator** – Validate user input using decorators such as `@IsEmail`, `@Length`, etc.
- **class-transformer** – Automatically transform plain objects into class instances for validation.
- Helps prevent invalid or malicious data from entering your business logic.

###  Guards
Protect routes using NestJS guards to handle authorization logic:

- **JWT Auth Guard** – Validates JWTs and attaches the user to the request object if the token is valid.
- **Roles Guard** – Ensures only users with the correct role(s) can access certain endpoints.
- Guards are layered with decorators (`@UseGuards`) and custom logic for maximum flexibility.

###  Filters
Handle unexpected and known errors using a global exception filter:

- **Global HTTP Exception Filter** – Catches all unhandled exceptions and formats error responses consistently.

###  Interceptors
Customize and format API responses consistently across all routes:

- **Transform Interceptor** – Wraps responses in a standard format (e.g., `{ statusCode, data }`).

---

##  Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Authentication:** Passport + JWT
- **Validation:** class-validator, class-transformer
- **Database:**  MongoDB
