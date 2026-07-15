import { destinationspage } from "../data/destinations";

const DEST_KEY = "ea_destinations";

function init() {
  if (!localStorage.getItem(DEST_KEY)) {
    localStorage.setItem(DEST_KEY, JSON.stringify(destinationspage));
  }
}

export const destinationService = {
  getAll() {
    init();
    return JSON.parse(localStorage.getItem(DEST_KEY));
  },

  getById(id) {
    return this.getAll().find((d) => d.id === id) || null;
  },

  create(data) {
    const dests = this.getAll();
    const newDest = {
      id: Date.now(),
      ...data,
      cta: data.cta || { text: "View Details", href: "/tour-packages", style: "button" },
      className: data.className || "h-[300px]",
    };
    dests.push(newDest);
    localStorage.setItem(DEST_KEY, JSON.stringify(dests));
    return dests;
  },

  update(id, data) {
    const dests = this.getAll().map((d) =>
      d.id === id ? { ...d, ...data } : d
    );
    localStorage.setItem(DEST_KEY, JSON.stringify(dests));
    return dests;
  },

  remove(id) {
    const dests = this.getAll().filter((d) => d.id !== id);
    localStorage.setItem(DEST_KEY, JSON.stringify(dests));
    return dests;
  },
};
