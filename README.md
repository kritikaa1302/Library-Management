# 📚 LibraSphere — Digital Library Management System

<p align="center">
  <strong>A modern full-stack MERN application for smarter digital library management.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-Authentication-purple?logo=jsonwebtokens" alt="JWT">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

---

## 📌 Project Overview

**LibraSphere** is a full-stack **Digital Library Management System** built using the **MERN stack — MongoDB, Express.js, React.js, and Node.js**.

The system provides a centralized platform for managing books, users, borrowing activities, wishlists, categories, announcements, and library analytics.

It includes separate experiences for **Users and Administrators**, with JWT-based authentication and role-based authorization.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Secure password hashing using bcryptjs
* Role-based access control
* User/Admin protected routes
* Session persistence
* Logout functionality

### 📚 Book Management

* Browse available books
* Search books by title or author
* Filter books by category
* View detailed book information
* Track available copies
* Admin CRUD operations
* Add, edit, and delete books

### 📖 Borrowing System

* Borrow available books
* Automatic 14-day due date
* Return borrowed books
* Automatic overdue detection
* Fine calculation for late returns
* User borrowing history
* Admin borrowing management

### ❤️ Wishlist

* Add books to wishlist
* Remove books from wishlist
* View saved books
* Quick access to favorite books

### 👨‍💼 Admin Dashboard

* Dashboard analytics
* Book management
* User management
* Borrow management
* Category management
* Announcement management
* Block/unblock users
* Library statistics
* Interactive charts

### 📢 Announcements

* Admin can create announcements
* Users can view announcements
* Delete outdated announcements
* Display important library updates

### 🎨 Modern UI

* Responsive design
* Dark/light mode
* CSS variable-based theming
* Toast notifications
* Modern cards and dashboards
* Responsive navigation
* Mobile-friendly layout
* Font Awesome icons
* Interactive charts

---

# 🛠️ Tech Stack

## Frontend

| Technology       | Purpose                         |
| ---------------- | ------------------------------- |
| React 18         | Frontend UI                     |
| React Router v6  | Routing                         |
| Context API      | Global state management         |
| Axios            | API communication               |
| Chart.js         | Analytics charts                |
| React Chart.js 2 | React chart integration         |
| Font Awesome     | Icons                           |
| CSS Variables    | Theme management                |
| Vite             | Frontend development/build tool |

## Backend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | Runtime environment       |
| Express.js | Backend framework         |
| MongoDB    | Database                  |
| Mongoose   | MongoDB ODM               |
| JWT        | Authentication            |
| bcryptjs   | Password hashing          |
| Helmet     | Security                  |
| CORS       | Cross-origin requests     |
| dotenv     | Environment configuration |

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      User/Admin     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │     + Vite          │
                    └──────────┬──────────┘
                               │
                         Axios Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express.js API    │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │ Authentication  │        │   Controllers   │
        │   Middleware    │        │ Business Logic  │
        └─────────────────┘        └────────┬────────┘
                                            │
                                            ▼
                                  ┌─────────────────┐
                                  │    Mongoose     │
                                  │      ODM        │
                                  └────────┬────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │     MongoDB     │
                                  │    Database     │
                                  └─────────────────┘
```

---

# 📁 Project Structure

```text
librasphere/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   │
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── LICENSE
```

---

# 🗄️ Database Design

LibraSphere uses **MongoDB** with Mongoose.

### User

```text
User
├── name
├── email
├── password
├── role
├── isBlocked
├── wishlist
├── createdAt
└── updatedAt
```

### Book

```text
Book
├── title
├── author
├── description
├── category
├── isbn
├── totalCopies
├── availableCopies
├── coverImage
├── publishedYear
└── createdAt
```

### Borrow

```text
Borrow
├── user
├── book
├── borrowedAt
├── dueDate
├── returnedAt
├── status
└── fine
```

### Category

```text
Category
├── name
└── createdAt
```

### Announcement

```text
Announcement
├── title
├── message
├── createdBy
└── createdAt
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js 18+
* MongoDB or MongoDB Atlas
* npm
* Git

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/librasphere.git

cd librasphere
```

---

## 2️⃣ Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/librasphere
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

Or:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open another terminal:

```bash
cd frontend

npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The application will usually be available at:

```text
http://localhost:3000
```

---

# 🌱 Database Seeding

To insert sample data:

```bash
cd backend

node seed.js
```

The seed script can create:

* Admin account
* Reader account
* Sample books
* Categories
* Initial library data

### Default Admin

```text
Email: admin@library.com
Password: Admin@123

```

> ⚠️ Change default credentials before using the application in production.

---

# 📡 API Documentation

All APIs use the following base path:

```text
/api
```

## Authentication

| Method | Endpoint         | Description      | Access |
| ------ | ---------------- | ---------------- | ------ |
| POST   | `/auth/register` | Register user    | Public |
| POST   | `/auth/login`    | Login user       | Public |
| GET    | `/auth/me`       | Get current user | JWT    |

## Books

| Method | Endpoint     | Description      | Access |
| ------ | ------------ | ---------------- | ------ |
| GET    | `/books`     | Get all books    | Public |
| GET    | `/books/:id` | Get book details | Public |
| POST   | `/books`     | Create book      | Admin  |
| PUT    | `/books/:id` | Update book      | Admin  |
| DELETE | `/books/:id` | Delete book      | Admin  |

## Borrowing

| Method | Endpoint              | Description            | Access |
| ------ | --------------------- | ---------------------- | ------ |
| POST   | `/borrows/borrow`     | Borrow book            | User   |
| PUT    | `/borrows/return/:id` | Return book            | User   |
| GET    | `/borrows/user`       | User borrowing history | User   |
| GET    | `/borrows/all`        | All borrowing records  | Admin  |

## Users

| Method | Endpoint           | Description        | Access |
| ------ | ------------------ | ------------------ | ------ |
| GET    | `/users`           | Get all users      | Admin  |
| PUT    | `/users/block/:id` | Block/unblock user | Admin  |
| PUT    | `/users/profile`   | Update profile     | User   |
| GET    | `/users/wishlist`  | Get wishlist       | User   |
| POST   | `/users/wishlist`  | Toggle wishlist    | User   |

## Categories

| Method | Endpoint            | Description     | Access |
| ------ | ------------------- | --------------- | ------ |
| GET    | `/categories`       | Get categories  | Public |
| POST   | `/categories`       | Create category | Admin  |
| DELETE | `/categories/:name` | Delete category | Admin  |

## Announcements

| Method | Endpoint             | Description         | Access |
| ------ | -------------------- | ------------------- | ------ |
| GET    | `/announcements`     | Get announcements   | Public |
| POST   | `/announcements`     | Create announcement | Admin  |
| DELETE | `/announcements/:id` | Delete announcement | Admin  |

---

# 🖥️ Frontend Routes

| Route                  | Page                 | Access |
| ---------------------- | -------------------- | ------ |
| `/login`               | Login                | Public |
| `/signup`              | Sign Up              | Public |
| `/forgot-password`     | Forgot Password      | Public |
| `/`                    | User Dashboard       | User   |
| `/explore`             | Explore Books        | User   |
| `/borrows`             | My Borrows           | User   |
| `/wishlist`            | Wishlist             | User   |
| `/profile`             | Profile              | User   |
| `/admin`               | Admin Dashboard      | Admin  |
| `/admin/books`         | Manage Books         | Admin  |
| `/admin/users`         | Manage Users         | Admin  |
| `/admin/borrows`       | Manage Borrows       | Admin  |
| `/admin/categories`    | Manage Categories    | Admin  |
| `/admin/announcements` | Manage Announcements | Admin  |

---

# 📊 Admin Dashboard

The admin dashboard provides an overview of library operations.

### Dashboard Metrics

* 📚 Total Books
* 👥 Total Users
* 📖 Active Borrows
* 🔄 Returned Books
* ⚠️ Overdue Books
* 💰 Total Fines
* ❤️ Wishlist Activity

### Analytics

Charts can display:

* Borrowing trends
* Popular books
* Category distribution
* User statistics
* Returned vs borrowed books
* Overdue borrowing
* Library activity

---

# 🔒 Security

LibraSphere implements several security practices:

* JWT authentication
* Password hashing with bcryptjs
* Role-based authorization
* Protected API routes
* Admin middleware
* Helmet security headers
* CORS configuration
* Environment variables for secrets
* MongoDB database validation

---

# 🎨 UI & UX

The application is designed to provide a modern digital library experience.

### UI Highlights

* Responsive dashboard
* Dark / Light theme
* Book cards
* Search interface
* Category filters
* Modal dialogs
* Toast notifications
* Admin analytics
* Mobile-friendly navigation
* Interactive charts

---


# 🧪 Testing

Currently, LibraSphere can be tested manually through:

* Frontend UI
* Browser developer tools
* Postman
* API requests
* Different user roles

Recommended testing scenarios:

```text
User Registration
       ↓
User Login
       ↓
Browse Books
       ↓
Borrow Book
       ↓
Check Due Date
       ↓
Return Book
       ↓
Check Fine
```

Admin workflow:

```text
Admin Login
     ↓
Dashboard
     ↓
Manage Books
     ↓
Manage Users
     ↓
Manage Categories
     ↓
Manage Borrows
     ↓
Post Announcements
```

---

# ⚙️ Environment Variables

## Backend

| Variable     | Description               | Required |
| ------------ | ------------------------- | -------- |
| `PORT`       | Backend server port       | Yes      |
| `MONGO_URI`  | MongoDB connection string | Yes      |
| `JWT_SECRET` | JWT signing secret        | Yes      |
| `NODE_ENV`   | Application environment   | Yes      |

## Frontend

| Variable       | Description     | Required |
| -------------- | --------------- | -------- |
| `VITE_API_URL` | Backend API URL | Yes      |

---

# 📦 Deployment

## Backend

The backend can be deployed using services such as:

* Render
* Railway
* Heroku
* VPS
* Other Node.js hosting platforms

Set the following production environment variables:

```env
PORT=5000
MONGO_URI=your_production_mongodb_url
JWT_SECRET=your_production_secret
NODE_ENV=production
```

Then:

```bash
npm install
npm start
```

---

## Frontend

Build the React application:

```bash
npm run build
```

The production files will be generated inside:

```text
dist/
```

The frontend can be deployed to platforms such as:

* Vercel
* Netlify
* Cloudflare Pages
* Static hosting

Set:

```env
VITE_API_URL=https://your-backend-url/api
```

---

# 🔮 Future Enhancements

Planned improvements for future versions:

* 📧 Email notifications for due dates
* 🔔 Real-time notifications
* 📱 Progressive Web App support
* 📖 Book reviews and ratings
* 🤖 AI-powered book recommendations
* 🔍 Advanced search with filters
* 📊 Advanced analytics
* 📅 Reservation system
* 💳 Online fine payment
* 📑 PDF report generation
* 📤 Export library reports to CSV/Excel
* 🔐 Two-factor authentication
* 📚 Digital book/eBook support
* 🧠 Personalized recommendation engine

---

# 🤝 Contributing

Contributions are welcome!

### Steps

```bash
# Fork the repository

# Clone your fork
git clone https://github.com/yourusername/librasphere.git

# Create a new branch
git checkout -b feature/new-feature

# Make your changes

# Commit
git commit -m "Add new feature"

# Push
git push origin feature/new-feature
```

Then open a Pull Request.

---

# 📝 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

---

# 🙏 Acknowledgements

* React community
* Node.js community
* Express.js
* MongoDB
* Mongoose
* Chart.js
* Font Awesome
* Vite
* Inspiration from modern digital library management systems

---

# 👨‍💻 Author

**Your Name**


🔗 GitHub: `https://github.com/vijeelakshmi`

---

# ⭐ Support

If you found **LibraSphere** useful or interesting, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  📚 <strong>LibraSphere</strong> — Manage. Borrow. Discover. Read.
</p>

<p align="center">
  <strong>Happy Reading! 📖</strong>
</p>
