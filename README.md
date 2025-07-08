# 🍽️ Data Kitchen API

A full-featured RESTful API built with **Node.js**, **Express**, and **MongoDB** to manage a restaurant's menu and personnel.

Supports secure **JWT-based authentication**, **role-based authorization**, and includes full CRUD capabilities for both **menu items** and **hotel workers**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- ✅ **JWT Authentication** for secure login and protected routes
- 🧾 **Signup & Login** support for hotel workers
- 🧠 **Role-Based Access Control (RBAC)** using `authorizeRoles` middleware
- 🔑 **Roles Supported**: `chef`, `manager`, `waiter`

### 🧑‍🍳 Person Management (`/person`)
- 👤 Add a new hotel worker (`POST /signup`)
- 🔐 Login and get JWT token (`POST /login`)
- 📋 Get all workers or filter by role (`GET /person`, `GET /person/:work`)
- 🛡️ Get your own profile info (`GET /person/profile`)
- ✏️ Update or delete a person (manager only) (`PUT /person/:id`, `DELETE /person/:id`)

### 🍔 Menu Management (`/menu`)
- 📄 Get all menu items or filter by taste (`GET /menu`, `GET /menu/:taste`)
- ➕ Add a new item (chefs & managers only) (`POST /menu`)
- 🛠️ Update or delete an item (managers only, chefs can update) (`PUT /menu/:id`, `DELETE /menu/:id`)

---

## ⚙️ Tech Stack

| Layer         | Tech Used         |
|---------------|-------------------|
| Server        | Node.js + Express |
| Database      | MongoDB Atlas     |
| ORM           | Mongoose          |
| Auth          | JWT + Passport.js |
| Middleware    | Custom (RBAC, Auth) |
| Passwords     | bcrypt (hashed)   |

---

## 🗂️ Project Structure
```
📁 /
│
├── 📁 routes
│ ├── 📄 personRoutes.js
│ └── 📄 menuRoutes.js
│
├── 📁 models
│ ├── 📄 person.js
│ └── 📄 menuItem.js
│
├── 📁 middlewares
│ ├── 📄 jwtAuth.js
│ ├── 📄 basicAuth.js
│ ├── 📄 authorizeRoles.js
│ └── 📄 index.js
│
├── 📄 db.js
├── 📄 server.js
├── 📄 package.json
└── 🌱 .env
```


---

## 🔑 Roles & Permissions

| Route                          | Roles Allowed     |
|-------------------------------|-------------------|
| `GET /menu`                   | All Authenticated |
| `POST /menu`                  | `chef`, `manager` |
| `PUT /menu/:id`               | `chef`, `manager` |
| `DELETE /menu/:id`            | `manager`         |
| `GET /person`                 | All Authenticated |
| `PUT /person/:id`             | `manager`         |
| `DELETE /person/:id`          | `manager`         |

---

## 📬 API Endpoints Overview

### 👥 Person

| Method | Route              | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/person/signup`   | Create user + get JWT        |
| POST   | `/person/login`    | Login and receive JWT        |
| GET    | `/person`          | Get all users (public)       |
| GET    | `/person/:work`    | Filter users by role (public)|
| GET    | `/person/profile`  | Get logged-in user info      |
| PUT    | `/person/:id`      | Update user (manager only)   |
| DELETE | `/person/:id`      | Delete user (manager only)   |

### 🍱 Menu

| Method | Route              | Description                  |
|--------|--------------------|------------------------------|
| GET    | `/menu`            | Get all menu items           |
| GET    | `/menu/:taste`     | Get items by taste           |
| POST   | `/menu`            | Add new item (chef, manager) |
| PUT    | `/menu/:id`        | Update item (chef, manager)  |
| DELETE | `/menu/:id`        | Delete item (manager only)   |

---

## 🧪 Testing with Postman

> Make sure to include your JWT token in the `Authorization` header as:  
Authorization: Bearer <your_token_here>


---

## 📦 Setup Instructions

1. Clone the repository and install all the dependencies by changing the directory to /node-backend-mastery
  ```bash
   https://github.com/in-coder-aps/node-backend-mastery.git
   cd node-backend-mastery
   npm install
   ```
2. Create a .env file and add your MongoDB URI & JWT secret:

   PORT=3000
   MONGO_URL=your_mongodb_atlas_connection
   JWT_SECRET=your_secret_key

3. Run the server
   npm start

🙌 Acknowledgements
    Inspired by real-world backend patterns

    Passport.js for Basic Authentication

    bcrypt for password hashing

    MongoDB Atlas for cloud database hosting

💡 Future Improvements
🧾 Token Refresh system

📊 Admin dashboard for stats

✅ Unit & integration testing

📃 API documentation with Swagger

Made with ❤️ by Aditya
