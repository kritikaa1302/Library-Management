import api from './axiosConfig';

export const getAllUsers = () => api.get('/users');

export const toggleBlockUser = (userId) => api.put(`/users/block/${userId}`);

export const updateProfile = (name) => api.put('/users/profile', { name });

export const getWishlist = () => api.get('/users/wishlist');

export const toggleWishlist = (bookId) => api.post('/users/wishlist', { bookId });