import Review from "../models/Review.js";
import Book from "../models/Book.js";

// Add a review
export const addReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText } = req.body;

    // check if book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // check if user already reviewed
    const existingReview = await Review.findOne({ bookId, userId: req.user.id });
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this book" });
    }

    const review = new Review({
      bookId,
      userId: req.user.id,
      rating,
      reviewText,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

// Get all reviews for a book
export const getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).populate("userId", "name");
    
    // Calculate average rating
    const avgRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({ reviews, averageRating: avgRating.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    review.rating = req.body.rating || review.rating;
    review.reviewText = req.body.reviewText || review.reviewText;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};
