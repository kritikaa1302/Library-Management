import api from './axiosConfig';

export const borrowBook = (bookId) => api.post('/borrows/borrow', { bookId });

export const returnBook = (borrowId) => api.put(`/borrows/return/${borrowId}`);

export const getUserBorrows = () => api.get('/borrows/user');

export const getAllBorrows = () => api.get('/borrows/all');