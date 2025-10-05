# 📚 Book Review Platform (MERN Stack)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react&logoColor=white)](https://reactjs.org/)  
[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/)  
[![Express](https://img.shields.io/badge/Express-4.18.2-black?logo=express&logoColor=white)](https://expressjs.com/)  

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application to browse books, add reviews, and engage in discussions. Perfect for book lovers!  

---

## ✨ Features

- 🔐 **User Authentication** – Sign up, log in, and manage your profile securely  
- 📖 **Book Management** – Add, update, and delete books  
- 📝 **Reviews & Ratings** – Write, edit, and delete reviews  
- 💬 **Comments & Discussions** – Engage with other users  
- 📱 **Responsive Design** – Works on both desktop and mobile  

---

## 🧩 Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT, bcrypt  
- **Others:** Axios, React Router  

---

## 📂 Project Structure

```plaintext
book-review-platform/
│
├── backend/        # Node.js + Express server, API routes, controllers, models
├── frontend/       # React app with pages, components, context
├── .env            # Environment variables (DB URI, JWT secret)
├── package.json    # Backend dependencies
└── README.md       # Project documentation
## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/vaishnavisinghvasu/book-review-platform.git
cd book-review-platform
## 2️⃣ Backend Setup

```bash
cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>


Start backend server:

npm run dev

##3️⃣ Frontend Setup
cd ../frontend
npm install
npm start


The React app runs on: http://localhost:3000

🛠️ Usage

Sign up or log in

Browse books and add your own

Write reviews and rate books

Comment and discuss with other users


