import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  coverImage: { type: String, default: 'https://picsum.photos/id/42/200/280' },
  ratings: { type: Number, default: 4.5, min: 0, max: 5 },
  availableCopies: { type: Number, required: true, default: 3, min: 0 }
}, { timestamps: true });

export default mongoose.model('Book', BookSchema);