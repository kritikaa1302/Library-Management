import { useAuth } from '../../hooks/useAuth';
import { useBooks } from '../../hooks/useBooks';
import { useBorrow } from '../../hooks/useBorrow';
import { toggleWishlist } from '../../api/userApi';
import { showToast } from '../../components/Toast';
import BookCard from '../../components/BookCard';

export default function Wishlist() {
  const { user, updateUser } = useAuth();
  const { books } = useBooks();
  const { borrow } = useBorrow();

  const wishlistBooks = books.filter(b => user?.wishlist?.includes(b._id));

  const handleBorrow = async (bookId) => {
    try {
      await borrow(bookId);
      showToast('Book borrowed!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Borrow failed', 'error');
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await toggleWishlist(bookId);
      // Update user wishlist locally
      const updatedWishlist = user.wishlist.filter(id => id !== bookId);
      updateUser({ wishlist: updatedWishlist });
      showToast('Removed from wishlist', 'success');
    } catch (err) {
      showToast('Failed to update wishlist', 'error');
    }
  };

  if (wishlistBooks.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '2rem' }}>
        ❤️ Your wishlist is empty. Browse books to add some!
      </div>
    );
  }

  return (
    <div>
      <h2 className="gradient-text">Wishlist</h2>
      <div className="book-grid">
        {wishlistBooks.map(book => (
          <BookCard key={book._id} book={book} actions={
            <>
              <button className="btn-primary" onClick={() => handleBorrow(book._id)}>Borrow</button>
              <button className="btn-outline" onClick={() => handleRemove(book._id)}>Remove</button>
            </>
          } />
        ))}
      </div>
    </div>
  );
}