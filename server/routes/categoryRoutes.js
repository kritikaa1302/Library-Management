import express from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';
const router = express.Router();
router.get('/', getCategories);
router.post('/', authenticate, isAdmin, createCategory);
router.delete('/:name', authenticate, isAdmin, deleteCategory);
export default router;
