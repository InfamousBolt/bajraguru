import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
    }
    return Promise.reject(error);
  }
);

// --- Product APIs ---
export const productApi = {
  getAll: (params = {}) => api.get('/products', { params }).then((res) => res.data),
  getById: (id) => api.get(`/products/${id}`).then((res) => res.data),
  create: (data) => api.post('/products', data).then((res) => res.data),
  update: (id, data) => api.put(`/products/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/products/${id}`).then((res) => res.data),
  uploadImages: (id, formData) =>
    api
      .post(`/products/${id}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data),
  deleteImage: (productId, imageId) =>
    api.delete(`/products/${productId}/images/${imageId}`).then((res) => res.data),
};

// --- Feedback APIs ---
export const feedbackApi = {
  getAll: () => api.get('/feedback').then((res) => res.data),
  create: (data) => api.post('/feedback', data).then((res) => res.data),
  delete: (id) => api.delete(`/feedback/${id}`).then((res) => res.data),
};

// --- Contact APIs ---
export const contactApi = {
  getAll: () => api.get('/contact').then((res) => res.data),
  create: (data) => api.post('/contact', data).then((res) => res.data),
};

// --- Auth APIs ---
export const authApi = {
  login: (password) => api.post('/auth/login', { password }).then((res) => res.data),
  verify: () => api.get('/auth/verify').then((res) => res.data),
};

export default api;
