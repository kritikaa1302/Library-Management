import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem('token');
    let token = storedToken;

    // useLocalStorage serializes values with JSON.stringify(). Parse that
    // representation so the Authorization header contains the raw JWT.
    if (storedToken) {
      try {
        token = JSON.parse(storedToken);
      } catch {
        // Keep supporting tokens saved by older versions as plain strings.
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling (e.g., 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
