import { useContext } from 'react';
import { BorrowContext } from '../context/BorrowContext';

export const useBorrow = () => useContext(BorrowContext);