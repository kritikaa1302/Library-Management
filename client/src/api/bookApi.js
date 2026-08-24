import api from './axiosConfig';

export const getBooks = (search = '', category = 'All') =>
  api.get('/books', { params: { search, category } });

export const getBookById = (id) => api.get(`/books/${id}`);

const multipartConfig = (data) =>
  data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;

export const createBook = (bookData) => api.post('/books', bookData, multipartConfig(bookData));

export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData, multipartConfig(bookData));

export const deleteBook = (id) => api.delete(`/books/${id}`);
