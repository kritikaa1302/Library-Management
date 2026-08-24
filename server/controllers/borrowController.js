import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';
import User from '../models/User.js';

export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.availableCopies < 1) {
      return res.status(400).json({ message: 'No copies available' });
    }

    // Check if user already has this book borrowed and not returned
    const existing = await Borrow.findOne({ userId, bookId, status: 'borrowed' });
    if (existing) return res.status(400).json({ message: 'You already borrowed this book' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Calculate due date (14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrow = new Borrow({
      userId,
      bookId,
      userName: user.name,
      bookTitle: book.title,
      dueDate,
      status: 'borrowed'
    });

    // Decrement available copies
    book.availableCopies -= 1;
    await book.save();

    await borrow.save();

    // Add borrow to user's borrowedBooks
    user.borrowedBooks.push(borrow._id);
    await user.save();

    res.status(201).json(borrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const borrow = await Borrow.findById(id);
    if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });
    if (borrow.status === 'returned') {
      return res.status(400).json({ message: 'Book already returned' });
    }

    borrow.status = 'returned';
    borrow.returnDate = new Date();

    // Calculate fine if overdue (simple example: $1 per day overdue)
    const due = new Date(borrow.dueDate);
    const now = new Date();
    if (now > due) {
      const diffDays = Math.ceil((now - due) / (1000 * 60 * 60 * 24));
      borrow.fine = diffDays * 1; // $1 per day
    }

    await borrow.save();

    // Increase available copies
    const book = await Book.findById(borrow.bookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    // Remove borrow from user's borrowedBooks
    const user = await User.findById(borrow.userId);
    if (user) {
      user.borrowedBooks = user.borrowedBooks.filter(id => id.toString() !== borrow._id.toString());
      await user.save();
    }

    res.json({ message: 'Book returned successfully', fine: borrow.fine });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserBorrows = async (req, res) => {
  try {
    const userId = req.user.id;
    const borrows = await Borrow.find({ userId }).populate('bookId').sort({ borrowDate: -1 });
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find().populate('userId', 'name email').populate('bookId', 'title').sort({ borrowDate: -1 });
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};