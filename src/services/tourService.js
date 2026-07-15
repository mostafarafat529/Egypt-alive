import { packages } from "../data/tourpachages";

const TOURS_KEY = "ea_tours";

function init() {
  if (!localStorage.getItem(TOURS_KEY)) {
    localStorage.setItem(TOURS_KEY, JSON.stringify(packages));
  }
}

export const tourService = {
  getAll() {
    init();
    return JSON.parse(localStorage.getItem(TOURS_KEY));
  },

  getById(id) {
    return this.getAll().find((t) => t.id === id) || null;
  },

  create(data) {
    const tours = this.getAll();
    const newTour = {
      id: Date.now(),
      ...data,
      rating: data.rating || 4.5,
      reviewCount: data.reviewCount || 0,
    };
    tours.push(newTour);
    localStorage.setItem(TOURS_KEY, JSON.stringify(tours));
    return tours;
  },

  update(id, data) {
    const tours = this.getAll().map((t) =>
      t.id === id ? { ...t, ...data } : t
    );
    localStorage.setItem(TOURS_KEY, JSON.stringify(tours));
    return tours;
  },

  remove(id) {
    const tours = this.getAll().filter((t) => t.id !== id);
    localStorage.setItem(TOURS_KEY, JSON.stringify(tours));
    return tours;
  },
};
