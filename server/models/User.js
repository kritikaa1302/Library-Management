import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: 'https://randomuser.me/api/portraits/lego/1.jpg' },
  isVerified: { type: Boolean, default: true },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Borrow' }]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);