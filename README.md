# MERN Stack JWT Authentication System

This project is a comprehensive **full-stack authentication solution** utilizing the MERN stack (MongoDB, Express, React, Node.js). It implements a **dual-token strategy** (Access and Refresh tokens) to provide a secure and seamless user experience.

---

##  Key Features

### Backend (Node.js & Express)

* **Dual Token Strategy**: Uses short-lived **Access Tokens** (15m) and long-lived **Refresh Tokens** (7d).
* **Secure Storage**: Refresh tokens are sent to the client via **HTTP-Only, Secure cookies**, preventing XSS access.
* **Database Integration**: Mongoose-powered user schema with password hashing via `bcryptjs`.
* **Session Management**: Refresh tokens are stored in MongoDB to allow for persistent sessions and easy logout/revocation.
* **Protected Middleware**: Custom `verifyJWT` middleware secures sensitive API endpoints.

### Frontend (React)

* **Axios Interceptors**: Automatically attaches Access Tokens to headers and handles **silent token refreshes** upon 403 errors.
* **Glassmorphism UI**: High-end aesthetic design with smooth animations and responsive layouts.
* **Session Persistence**: Synchronizes authentication state across page reloads using `localStorage` and background refresh calls.
* **Smooth UX**: Features a random wallpaper dashboard and intuitive transitions between Login and Signup views.

---

## 🛠️ Technical Architecture

### Token Workflow

1. **Login**: User submits credentials; server returns an **Access Token** in the JSON body and a **Refresh Token** in a secure cookie.
2. **Authorized Requests**: The Axios interceptor grabs the token from `localStorage` and adds it to the `Authorization` header.
3. **Silent Refresh**: When the Access Token expires (403 error), the interceptor automatically calls `/auth/refresh`. The server validates the cookie and issues a new token without the user noticing.

---

## 📂 Project Structure

### Backend

* `server.js`: App entry point with CORS and middleware setup.
* `controllers/authController.js`: Handles logic for register, login, refresh, and logout.
* `routes/authRoutes.js`: Defines public and protected API endpoints.
* `utils/tokens.js`: Utility functions for generating JWTs.

### Frontend

* `api/axios.js`: Centralized Axios instance with request/response interceptors.
* `pages/`: Contains the Glassmorphic `Login` and `Signup` components.
* `Dashboard.js`: Private view accessible only to authenticated users.
* `App.js`: Main state controller managing authentication flow.

---

## ⚙️ Setup & Installation

### 1. Environment Configuration

Create a `.env` file in your server directory:

```env
PORT=3500
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key_1
REFRESH_TOKEN_SECRET=your_secret_key_2

```

### 2. Install Dependencies

```bash
# In the root/server directory
npm install

# In the client directory
npm install

```

### 3. Run the Application

```bash
# Start Backend
npm run dev

# Start Frontend
npm start

```

---

## 🔑 API Reference

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | Registers a new user |
| `POST` | `/auth/login` | Public | Authenticates user & sets cookies |
| `GET` | `/auth/refresh` | Public | Refreshes the Access Token via cookie |
| `POST` | `/auth/logout` | Public | Clears cookies and DB session |
| `GET` | `/auth/profile` | Private | Returns protected user data |

Would you like me to help you set up the **MongoDB connection logic** or a **Docker** configuration for this project?
