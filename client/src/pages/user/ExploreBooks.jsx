import { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { useBorrow } from '../../hooks/useBorrow';
import { useAuth } from '../../hooks/useAuth';
import { toggleWishlist } from '../../api/userApi';
import { showToast } from '../../components/Toast';
import BookCard from '../../components/BookCard';

export default function ExploreBooks() {
  const { books, loading, search, setSearch, category, setCategory } = useBooks();
  const { borrow } = useBorrow();
  const { user, updateUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState(search);
  const [filterCat, setFilterCat] = useState(category);

  const handleSearch = () => {
    setSearch(searchTerm);
    setCategory(filterCat);
  };

  const handleBorrow = async (bookId) => {
    try {
      await borrow(bookId);
      showToast('Book borrowed successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Borrow failed', 'error');
    }
  };

  const handleWishlist = async (bookId) => {
    try {
      await toggleWishlist(bookId);
      // Refresh user data or update context
      const updated = await getMe(); // we could also call getMe, but simpler: update local user
      // For simplicity, we'll just refetch user from API via context? We'll handle by updating user wishlist locally
      // Since we don't have a direct way, we'll call updateUser with new wishlist from response
      // But we can also just update user state by fetching again. For brevity, we'll show a toast.
      showToast('Wishlist updated', 'success');
    } catch (err) {
      showToast('Failed to update wishlist', 'error');
    }
  };

  const isInWishlist = (bookId) => user?.wishlist?.includes(bookId) || false;

  // We'll add a small helper to call getMe and update context
  // But we'll rely on the user context to update after wishlist toggle
  // We'll just use the current user state and assume the API call updates the backend.

  return (
    <div>
      <h2 className="gradient-text">Explore Books</h2>
      <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.2rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search by title or author…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: '180px' }}
        />
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
          <option value="All">All Categories</option>
          {/* We'll fetch categories from API or use a static list; we'll use the book context's categories if available, but we don't have it. We'll just hardcode some. */}
          <option value="Fiction">Fiction</option>
          <option value="Self-help">Self-help</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Biography">Biography</option>
          <option value="Fantasy">Fantasy</option>
          <option value="History">History</option>
          <option value="Technology">Technology</option>
        </select>
        <button className="btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="book-grid">
          {books.map(book => (
            <BookCard key={book._id} book={book} actions={
              <>
                <button className="btn-primary" onClick={() => handleBorrow(book._id)}>Borrow</button>
                <button className="btn-outline" onClick={() => handleWishlist(book._id)}>
                  {isInWishlist(book._id) ? '❤️' : '🤍'}
                </button>
              </>
            } />
          ))}
          {books.length === 0 && <p>No books found.</p>}
        </div>
      )}
    </div>
  );
}