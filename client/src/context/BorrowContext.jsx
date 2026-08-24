import { createContext, useState, useEffect } from 'react';
import { getUserBorrows, borrowBook, returnBook } from '../api/borrowApi';
import { useAuth } from '../hooks/useAuth';

export const BorrowContext = createContext();

export const BorrowProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBorrows = async () => {
    setLoading(true);
    try {
      const { data } = await getUserBorrows();
      setBorrows(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setBorrows([]);
      return;
    }

    fetchBorrows();
  }, [user, authLoading]);

  const borrow = async (bookId) => {
    const { data } = await borrowBook(bookId);
    setBorrows(prev => [data, ...prev]);
    return data;
  };

  const returnBorrow = async (borrowId) => {
    const { data } = await returnBook(borrowId);
    setBorrows(prev => prev.map(b =>
      b._id === borrowId ? { ...b, status: 'returned', returnDate: data.returnDate, fine: data.fine } : b
    ));
    return data;
  };

  return (
    <BorrowContext.Provider value={{ borrows, loading, fetchBorrows, borrow, returnBorrow }}>
      {children}
    </BorrowContext.Provider>
  );
};
