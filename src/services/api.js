import { request } from "../config/axios";

export const authAPI = {
  login: (credentials) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  register: (data) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
};

export const destinationsAPI = {
  getAll: () => request("/destinations"),
  getById: (id) => request(`/destinations/${id}`),
};

export const bookingAPI = {
  getAll: () => request("/bookings"),
  getById: (id) => request(`/bookings/${id}`),
  create: (bookingData) =>
    request("/bookings", { method: "POST", body: JSON.stringify(bookingData) }),
};

export const userAPI = {
  getProfile: () => request("/users/profile"),
  updateProfile: (data) =>
    request("/users/profile", { method: "PUT", body: JSON.stringify(data) }),
};

export const adminAPI = {
  getStats: () => request("/admin/stats"),
  getUsers: () => request("/admin/users"),
  getBookings: () => request("/admin/bookings"),
};
