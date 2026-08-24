import api from './axiosConfig';

export const getCategories = () => api.get('/categories');

export const createCategory = (name, description = '') =>
  api.post('/categories', { name, description });

export const deleteCategory = (name) => api.delete(`/categories/${name}`);