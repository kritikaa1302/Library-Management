import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' }
}, { timestamps: true });

// Generate the required slug before Mongoose validates the document.
CategorySchema.pre('validate', function() {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
});

export default mongoose.model('Category', CategorySchema);
