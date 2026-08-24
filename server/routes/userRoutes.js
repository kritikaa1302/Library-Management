import express from 'express';
import {
  getAllUsers,
  toggleBlockUser,
  updateProfile,
  getWishlist,
  toggleWishlist
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';

const router = express.Router();

router.get('/', authenticate, isAdmin, getAllUsers);
router.put('/block/:id', authenticate, isAdmin, toggleBlockUser);
router.put('/profile', authenticate, updateProfile);
router.get('/wishlist', authenticate, getWishlist);
router.post('/wishlist', authenticate, toggleWishlist);

export default router;