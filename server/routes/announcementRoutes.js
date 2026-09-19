import express from 'express';
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';
import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';
const router = express.Router();
router.get('/', getAnnouncements);
router.post('/', authenticate, isAdmin, createAnnouncement);
router.delete('/:id', authenticate, isAdmin, deleteAnnouncement);
export default router;
