import { useState, useEffect } from 'react';
import { getAllBorrows, returnBook } from '../../api/borrowApi';
import { showToast } from '../../components/Toast';

export default function ManageBorrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBorrows = async () => {
    try {
      const { data } = await getAllBorrows();
      setBorrows(data);
    } catch (err) {
      showToast('Failed to load borrow records', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  const handleReturn = async (borrowId) => {
    try {
      await returnBook(borrowId);
      setBorrows(prev => prev.map(b =>
        b._id === borrowId ? { ...b, status: 'returned', returnDate: new Date().toISOString().slice(0,10) } : b
      ));
      showToast('Marked as returned', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="gradient-text">All Borrow Records</h2>
      <div className="glass-table">
        <table>
          <thead>
            <tr><th>User</th><th>Book</th><th>Borrowed</th><th>Due</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {borrows.map(b => (
              <tr key={b._id}>
                <td>{b.userName}</td>
                <td>{b.bookTitle}</td>
                <td>{new Date(b.borrowDate).toLocaleDateString()}</td>
                <td>{new Date(b.dueDate).toLocaleDateString()}</td>
                <td>
                  <span style={{ background: b.status === 'borrowed' ? '#fef3c7' : '#d1fae5', padding: '3px 10px', borderRadius: '20px' }}>
                    {b.status}
                  </span>
                </td>
                <td>
                  {b.status === 'borrowed' ? (
                    <button className="btn-outline" onClick={() => handleReturn(b._id)}>Mark Returned</button>
                  ) : <span style={{ color: 'var(--success)' }}>Completed</span>}
                </td>
              </tr>
            ))}
            {borrows.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>No borrow records.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}