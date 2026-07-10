import api from './api';

export interface PropertyQuery {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  type?: string;
  minRent?: number;
  maxRent?: number;
  bedrooms?: number;
  bathrooms?: number;
  sort?: string;
}

export const propertyService = {
  list: (params: PropertyQuery = {}) =>
    api.get('/property', { params }).then((r) => r.data),
  get: (id: string) => api.get(`/property/${id}`).then((r) => r.data),
  create: (data: FormData) =>
    api.post('/property', data).then((r) => r.data),
  update: (id: string, data: FormData) =>
    api.put(`/property/${id}`, data).then((r) => r.data),
  remove: (id: string) => api.delete(`/property/${id}`).then((r) => r.data),
  myProperties: () => api.get('/owner/dashboard').then((r) => r.data),
};
