# Book Library Management System

This is a full-stack web application built to simulate a simple library system where users can borrow and return books, and admins can manage the book inventory. It supports role-based access control, accurate availability tracking, and a clean, mobile-responsive UI.

---

##  Features

### Authentication & Authorization
- Secure signup and login
- Role-based system: **Admin** and **User**

### Admin Functionalities
- Add new books with title, author, genre, and total copies
- Edit and delete existing book records
- View list of all books, including:
  - Total copies
  - Borrowed copies
  - Available copies

###  User Functionalities
- Browse the library catalog
- Borrow a book if available
- Return previously borrowed books
- View a personal list of borrowed books with borrow dates

### Project Rules
- A user cannot borrow the same book again until it’s returned
- Borrowing is disabled if no copies are available
- Book availability updates automatically

---

## Tech Stack

### Frontend
- **React** (with Hooks and Context API)
- **Material UI** for a responsive and clean UI

### 🖥Backend
- **Node.js** with **Express.js**
- **JWT** for token-based authentication
- **bcrypt** for secure password hashing

###  Database
- **MySQL** with Sequelize ORM
- Relational schema with well-defined foreign keys and constraints

> Chosen for a balance between performance, ease of use, and real-world relevance.


##  ER Diagram
https://drive.google.com/file/d/1PeA6SZEqP5lxOUA9m8tmVsnnzrbQrbzJ/view?usp=sharing

> Tables: `Users`, `Books`, `Borrow`
----

## API Endpoints

| Method | Endpoint                  | Purpose                                                      | Access         |
|--------|---------------------------|--------------------------------------------------------------|----------------|
| POST   | `/api/v1/user/signup`     | Register a new user (Admin/User)                             | Public         |
| POST   | `/api/v1/user/login`      | Log in and receive a JWT token                               | Public         |
| POST   | `/api/v1/user/logout`     | Log out the currently logged-in user                         | Authenticated  |
| GET    | `/api/v1/books/`          | Fetch all books in the library                               | Authenticated  |
| POST   | `/api/v1/books/`          | Add a new book to the library                                | Admin only     |
| PUT    | `/api/v1/books/:id`       | Update book details by ID                                    | Admin only     |
| DELETE | `/api/v1/books/:id`       | Delete a book by ID                                          | Admin only     |
| POST   | `/api/v1/borrow/borrow`   | Borrow a book (only if copies are available)                 | User only      |
| POST   | `/api/v1/borrow/return`   | Return a previously borrowed book                            | User only      |
| GET    | `/api/v1/borrow/borrowed` | Get list of books currently borrowed by the logged-in user   | User only      |

---
 # Setup & Installation
 
 ## Clone the repository

git clone https://github.com/your-username/book-library.git
cd book-library

## Backend Setup
cd backend
npm install
npm run dev

## Frontend Setup
cd frontend
npm install
npm start

## Configure Environment Variables
Create a .env file in the backend with:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=book_library
JWT_SECRET=your_jwt_secret

## Deployment

## Frontend:
Hosted on Render
## Backend: 
Hosted on Render

## Database: Hosted on Railway.app
https://railway.com/project/3c712a7f-762d-4076-a5c9-91a70cae12c0/service/228b55fc-89f6-46c6-ba5d-324dfb881038/data?environmentId=cd87a0ae-a70b-46e6-8772-cfd69ce9e7b1

## Demo Video
A short 3–5 minute walkthrough demonstrating key features:
User registration & login
Admin adding/updating/deleting books
Borrowing and returning books
Book availability logic

https://drive.google.com/file/d/1LF9zVkbbG6VkFGlNdqofgoA-YqBtdyEv/view?usp=sharing


