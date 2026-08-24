import { useState, useEffect } from 'react';
import { showToast } from './Toast';

export default function BookModal({ isOpen, onClose, onSave, book = null }) {
  const [coverFile, setCoverFile] = useState(null);
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: 'Fiction',
    description: '',
    availableCopies: 3,
    ratings: 4.5
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || '',
        author: book.author || '',
        category: book.category || 'Fiction',
        description: book.description || '',
        availableCopies: book.availableCopies ?? 3,
        ratings: book.ratings ?? 4.5
      });
    } else {
      setForm({
        title: '',
        author: '',
        category: 'Fiction',
        description: '',
        availableCopies: 3,
        ratings: 4.5
      });
    }
    setCoverFile(null);
  }, [book]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      showToast('Title and author are required', 'error');
      return;
    }
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (coverFile) formData.append('coverImage', coverFile);

    await onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{book ? 'Edit Book' : 'Add New Book'}</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="Fiction">Fiction</option>
            <option value="Self-help">Self-help</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Biography">Biography</option>
            <option value="Fantasy">Fantasy</option>
            <option value="History">History</option>
            <option value="Technology">Technology</option>
          </select>
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <label className="file-upload-field">
            <span>Book cover (JPG, PNG, or WebP)</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
            {coverFile && <small>{coverFile.name}</small>}
            {!coverFile && book?.coverImage && <small>Leave empty to keep the current cover.</small>}
          </label>
          <input name="availableCopies" type="number" placeholder="Available Copies" value={form.availableCopies} onChange={handleChange} min="0" />
          <input name="ratings" type="number" step="0.1" placeholder="Rating" value={form.ratings} onChange={handleChange} min="0" max="5" />
          <div className="modal-actions">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
