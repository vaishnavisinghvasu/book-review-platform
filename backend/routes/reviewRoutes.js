import express from "express";
import {
  addReview,
  getReviewsByBook,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a review
router.post("/", authMiddleware, addReview);

// Get all reviews for a book
router.get("/:bookId", getReviewsByBook);

// Update a review
router.put("/:id", authMiddleware, updateReview);

// Delete a review
router.delete("/:id", authMiddleware, deleteReview);

export default router;
