import { useBorrow } from '../../hooks/useBorrow';
import { showToast } from '../../components/Toast';

export default function MyBorrows() {
  const { borrows, loading, returnBorrow } = useBorrow();

  const handleReturn = async (borrowId) => {
    try {
      await returnBorrow(borrowId);
      showToast('Book returned successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Return failed', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;

  if (borrows.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
        📭 No borrowed books yet. <a href="/explore" style={{ color: 'var(--primary)' }}>Explore the library →</a>
      </div>
    );
  }

  return (
    <div>
      <h2 className="gradient-text">My Borrows</h2>
      <div className="book-grid">
        {borrows.map(borrow => (
          <div key={borrow._id} className="book-card">
            <img src={borrow.bookId?.coverImage || 'https://picsum.photos/id/42/200/280'} alt={borrow.bookTitle} className="book-cover" />
            <h4>{borrow.bookTitle}</h4>
            <p>Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()}</p>
            <p>Due: {new Date(borrow.dueDate).toLocaleDateString()}</p>
            <p>{borrow.status === 'borrowed' ? '⏳ Active' : '✅ Returned'}</p>
            {borrow.status === 'borrowed' && (
              <button className="btn-primary" onClick={() => handleReturn(borrow._id)}>Return</button>
            )}
            {borrow.fine > 0 && <p style={{ color: 'var(--danger)' }}>Fine: ${borrow.fine}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}