import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (payload) => api.post('/user/register', payload);
export const loginUser = (email, password) => api.post('/user/login', { email, password });
export const forgotPassword = (email) => api.post('/user/forgot-password', { email });
export const getProfile = () => api.get('/user/profile');
export const updateProfile = (payload) => api.put('/user/profile', payload);

export const getProperties = () => api.get('/property');
export const getPropertyById = (id) => api.get(`/property/${id}`);
export const createProperty = (payload) => api.post('/property', payload);
export const updateProperty = (id, payload) => api.put(`/property/${id}`, payload);
export const deleteProperty = (id) => api.delete(`/property/${id}`);

export const createBooking = (payload) => api.post('/booking', payload);
export const getUserBookings = () => api.get('/booking/user');
export const getOwnerBookings = () => api.get('/booking/owner');
export const getOwnerDashboard = () => api.get('/owner/dashboard');
export const updateBookingStatus = (id, status) => api.put(`/booking/${id}/status`, { bookingStatus: status });

export const getAdminUsers = () => api.get('/admin/users');
export const getAdminProperties = () => api.get('/admin/properties');
export const getAdminBookings = () => api.get('/admin/bookings');
export const approveOwner = (id) => api.put(`/admin/approve-owner/${id}`);
export const deleteUser = (id) => api.delete(`/admin/user/${id}`);

export default api;
