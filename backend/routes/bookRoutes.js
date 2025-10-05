// backend/routes/bookRoutes.js
import express from "express";
import { addBook, getBooks, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new book (protected)
router.post("/", authMiddleware, addBook);

// Get all books
router.get("/", getBooks);

// Get book by ID
router.get("/:id", getBookById);

// Update book (only creator)
router.put("/:id", authMiddleware, updateBook);

// Delete book (only creator)
router.delete("/:id", authMiddleware, deleteBook);

export default router;  // ✅ this fixes the error
