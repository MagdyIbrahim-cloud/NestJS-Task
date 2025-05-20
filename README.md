# NestJS-Task

##  Project Overview

This project is a RESTful API built with [NestJS](https://nestjs.com/), showcasing user management, authentication, role-based access control, and CRUD operations. It demonstrates how to implement the following features.

---

##  Features

###  User Management
- Create, read, update, and delete users.

###  Authentication
- JWT-based authentication using Passport strategy.
- Refresh token system for seamless token renewal.
- Session Id field for handeling `Sign In`, and `Logout` endpoints.
- Proper token handling during logout.

###  Role-Based Access Control
- Restrict access to endpoints based on user roles (e.g., `user`, `admin`).

###  Validation
- Uses **DTOs** with `class-validator` to ensure input validation and data security.

###  Guards
- Custom JWT authentication guard (extending Passport JWT strategy).
- Role guard to restrict access based on user roles.

###  Filters
- Global HTTP exception filter for consistent and secure error handling.

###  Interceptors
- Transform interceptor to format all responses into a standardized structure.

---

##  Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Authentication:** Passport + JWT
- **Validation:** class-validator, class-transformer
- **Database:**  MongoDB
