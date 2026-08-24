import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

export const useBooks = () => useContext(BookContext);