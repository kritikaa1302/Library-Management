import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';
import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', authenticate, isAdmin, upload.single('coverImage'), createBook);
router.put('/:id', authenticate, isAdmin, upload.single('coverImage'), updateBook);
router.delete('/:id', authenticate, isAdmin, deleteBook);

export default router;
