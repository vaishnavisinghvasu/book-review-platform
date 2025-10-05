import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const newBook = new Book({ title, author, description, genre, year, addedBy: req.user.id });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "", sort = "" } = req.query;
    const query = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { author: { $regex: search, $options: "i" } }];
    }

    let booksQuery = Book.find(query);
    if (sort === "year") booksQuery = booksQuery.sort({ year: -1 });
    else booksQuery = booksQuery.sort({ createdAt: -1 });

    const pageNum = parseInt(page), limitNum = parseInt(limit), skip = (pageNum - 1) * limitNum;
    const totalBooks = await Book.countDocuments(query);
    const totalPages = Math.ceil(totalBooks / limitNum);

    const books = await booksQuery.skip(skip).limit(limitNum);

    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ bookId: book._id });
        const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
        return { ...book.toObject(), averageRating: avgRating.toFixed(1) };
      })
    );

    if (sort === "rating") booksWithRatings.sort((a, b) => b.averageRating - a.averageRating);

    res.json({ books: booksWithRatings, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const reviews = await Review.find({ bookId: book._id }).populate("userId", "name");
    const averageRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

    res.json({ ...book.toObject(), reviews, averageRating });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    Object.assign(book, req.body);
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};
