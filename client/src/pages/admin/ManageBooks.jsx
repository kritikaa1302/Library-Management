import { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import BookCard from '../../components/BookCard';
import BookModal from '../../components/BookModal';
import { showToast } from '../../components/Toast';

export default function ManageBooks() {
  const { books, loading, addBook, editBook, removeBook } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const handleSave = async (bookData) => {
    if (editingBook) {
      await editBook(editingBook._id, bookData);
      showToast('Book updated!', 'success');
    } else {
      await addBook(bookData);
      showToast('Book added!', 'success');
    }
    setEditingBook(null);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this book?')) {
      await removeBook(id);
      showToast('Book deleted', 'success');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button className="btn-primary" onClick={() => { setEditingBook(null); setIsModalOpen(true); }}>
          <i className="fas fa-plus"></i> Add New Book
        </button>
      </div>
      {loading ? <div>Loading...</div> : (
        <div className="book-grid">
          {books.map(book => (
            <BookCard key={book._id} book={book} actions={
              <>
                <button className="btn-outline" onClick={() => handleEdit(book)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
              </>
            } />
          ))}
        </div>
      )}
      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        book={editingBook}
      />
    </div>
  );
}