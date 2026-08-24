import { createContext, useState, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../api/bookApi';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await getBooks(search, category);
      setBooks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, category]);

  const addBook = async (bookData) => {
    const { data } = await createBook(bookData);
    setBooks(prev => [data, ...prev]);
    return data;
  };

  const editBook = async (id, bookData) => {
    const { data } = await updateBook(id, bookData);
    setBooks(prev => prev.map(b => b._id === id ? data : b));
    return data;
  };

  const removeBook = async (id) => {
    await deleteBook(id);
    setBooks(prev => prev.filter(b => b._id !== id));
  };

  return (
    <BookContext.Provider value={{
      books,
      loading,
      search,
      setSearch,
      category,
      setCategory,
      fetchBooks,
      addBook,
      editBook,
      removeBook
    }}>
      {children}
    </BookContext.Provider>
  );
};