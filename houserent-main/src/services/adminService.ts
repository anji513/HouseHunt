import api from './api';

export const adminService = {
  users: () => api.get('/admin/users').then((r) => r.data),
  properties: () => api.get('/admin/properties').then((r) => r.data),
  bookings: () => api.get('/admin/bookings').then((r) => r.data),
  approveOwner: (userId: string) => api.put(`/admin/approve-owner/${userId}`).then((r) => r.data),
  deleteUser: (userId: string) => api.delete(`/admin/user/${userId}`).then((r) => r.data),
};
