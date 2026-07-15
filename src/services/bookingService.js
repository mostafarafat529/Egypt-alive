const BOOKINGS_KEY = "ea_bookings";

export const bookingService = {
  getAll() {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
  },

  getByUser(email) {
    return this.getAll().filter((b) => b.email === email);
  },

  create(data) {
    const bookings = this.getAll();
    const newBooking = {
      id: Date.now(),
      ...data,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return newBooking;
  },

  updateStatus(id, status) {
    const bookings = this.getAll().map((b) =>
      b.id === id ? { ...b, status } : b
    );
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return bookings;
  },

  remove(id) {
    const bookings = this.getAll().filter((b) => b.id !== id);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return bookings;
  },
};
