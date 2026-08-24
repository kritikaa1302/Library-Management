import api from './axiosConfig';

export const getAnnouncements = () => api.get('/announcements');

export const createAnnouncement = (title, content) =>
  api.post('/announcements', { title, content });

export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`);