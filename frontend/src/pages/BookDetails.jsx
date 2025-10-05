import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch book with reviews and average rating
  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load book details");
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleAddReview = async () => {
    if (!rating || !reviewText.trim()) {
      setError("Please provide both rating and review text");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      await API.post("/reviews", { bookId: id, rating, reviewText });
      setRating(0);
      setReviewText("");
      fetchBook(); // refresh book details to show new review
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add review");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  // Safe function to get average rating
  const getAverageRating = () => {
    const avg = book?.averageRating;
    if (typeof avg === 'number' && !isNaN(avg)) {
      return avg.toFixed(1);
    }
    return "0.0";
  };

  // Safe function to get rounded rating for stars
  const getRoundedRating = () => {
    const avg = book?.averageRating;
    if (typeof avg === 'number' && !isNaN(avg)) {
      return Math.round(avg);
    }
    return 0;
  };

  const renderStars = (starCount, size = "md") => {
    const starSize = size === "lg" ? "w-6 h-6" : "w-4 h-4";
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${starSize} ${
              star <= starCount ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          ({book?.reviews?.length || 0} reviews)
        </span>
      </div>
    );
  };

  const renderRatingInput = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
          >
            <svg
              className={`w-8 h-8 ${
                star <= (hoverRating || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              } transition-colors duration-150`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Books
        </button>

        {/* Book Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Book Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
                <p className="text-xl text-purple-100 mb-2">by {book.author}</p>
                <div className="flex items-center space-x-4 text-purple-100">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    {book.genre}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {book.year}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-center">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-300">
                    {getAverageRating()}
                  </div>
                  {renderStars(getRoundedRating(), "lg")}
                </div>
              </div>
            </div>
          </div>

          {/* Book Content */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{book.description}</p>
            </div>

            {/* Reviews Section */}
            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Reader Reviews ({book.reviews?.length || 0})
              </h3>

              {!book.reviews || book.reviews.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {book.reviews.map((review) => (
                    <div key={review._id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {review.userId?.name || "Anonymous Reader"}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Review Section */}
              <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Share Your Thoughts</h3>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating
                    </label>
                    {renderRatingInput()}
                  </div>

                  <div>
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      id="review"
                      value={reviewText}
                      onChange={(e) => {
                        setError("");
                        setReviewText(e.target.value);
                      }}
                      placeholder="Share your thoughts about this book..."
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleAddReview}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Review...
                      </div>
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;