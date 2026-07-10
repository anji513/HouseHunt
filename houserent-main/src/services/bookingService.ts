import api from './api';

export const bookingService = {
  create: (data: { propertyId: string }) => api.post('/booking', data).then((r) => r.data),
  userBookings: () => api.get('/booking/user').then((r) => r.data),
  ownerBookings: () => api.get('/booking/owner').then((r) => r.data),
  updateStatus: (id: string, status: string) =>
    api.put(`/booking/${id}/status`, { bookingStatus: status }).then((r) => r.data),
};
