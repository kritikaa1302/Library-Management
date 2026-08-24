import Book from '../models/Book.js';

// Get all books with optional search and category filter
export const getBooks = async (req, res) => {
  try {
    const { search = '', category = 'All' } = req.query;
    const filter = {};
    if (category !== 'All') filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, category, description, coverImage, availableCopies, ratings } = req.body;
    const uploadedCover = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/books/${req.file.filename}`
      : coverImage;
    const book = new Book({ title, author, category, description, coverImage: uploadedCover, availableCopies, ratings });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.coverImage = `${req.protocol}://${req.get('host')}/uploads/books/${req.file.filename}`;
    }
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
