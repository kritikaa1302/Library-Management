import express from 'express';
import {
  borrowBook,
  returnBook,
  getUserBorrows,
  getAllBorrows
} from '../controllers/borrowController.js';
import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';
const router = express.Router();
router.post('/borrow', authenticate, borrowBook);
router.put('/return/:id', authenticate, returnBook);
router.get('/user', authenticate, getUserBorrows);
router.get('/all', authenticate, isAdmin, getAllBorrows);
export default router;
