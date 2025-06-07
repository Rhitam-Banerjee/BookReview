const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    // Check for duplicates (case-insensitive)
    const existingBook = await Book.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      author: { $regex: new RegExp(`^${author}$`, 'i') },
      genre: { $regex: new RegExp(`^${genre}$`, 'i') }
    });

    if (existingBook) {
      return res.status(400).json({ message: 'Book with same title, author, and genre already exists.' });
    }

    const book = new Book({ title, author, genre });
    await book.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;

    const query = {};
    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }
    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      books,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 5 } = req.query;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const ratingAgg = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    const avgRating = ratingAgg[0]?.avgRating || 0;

    const reviews = await Review.find({ book: book._id })
      .populate('user', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalReviews = await Review.countDocuments({ book: book._id });

    res.json({
      book,
      averageRating: avgRating.toFixed(2),
      reviews: {
        total: totalReviews,
        page: parseInt(page),
        limit: parseInt(limit),
        results: reviews
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(q, 'i') },
      { author: new RegExp(q, 'i') }
    ]
  });
  res.json(books);
};
