📚 Book Review Platform (MERN Stack)

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows users to browse books, add reviews, and engage in discussions. This platform is perfect for book enthusiasts looking to share their thoughts and discover new reads.

🚀 Features

User Authentication: Sign up, log in, and manage your profile securely.

Book Management: Add, update, and delete books (admin or user-based access).

Reviews: Write, edit, and delete reviews for books.

Real-time Discussions: Comment and engage with other users.

Responsive Design: Works seamlessly on desktop and mobile devices.

🧩 Technologies Used

Frontend: React.js, HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JWT (JSON Web Tokens), bcrypt for password hashing

Others: Axios for API requests, React Router for navigation

📂 Project Structure
book-review-platform/
│
├── backend/        # Node.js + Express server, API routes, controllers, models
├── frontend/       # React application with pages, components, and context
├── .env            # Environment variables (DB URI, JWT secret, etc.)
├── package.json    # Backend dependencies
└── README.md       # Project documentation

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/vaishnavisinghvasu/book-review-platform.git
cd book-review-platform


Setup Backend

cd backend
npm install


Create a .env file with:

PORT=5000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>


Start the backend server:

npm run dev


Setup Frontend

cd ../frontend
npm install
npm start


The React app runs on http://localhost:3000.

🛠️ Usage

Sign up or log in to access full features.

Browse books and add your own.

Write and manage reviews.

Engage with other users via comments.

🤝 Contributing

Contributions are welcome! To contribute:

Fork the repository

Create a branch: git checkout -b feature-name

Make your changes

Commit: git commit -m "Add feature"

Push: git push origin feature-name

Open a Pull Request
