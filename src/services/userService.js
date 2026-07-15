import { users as defaultUsers } from "../data/users";

const USERS_KEY = "ea_users";

function init() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

export const userService = {
  getAll() {
    init();
    return JSON.parse(localStorage.getItem(USERS_KEY));
  },

  getById(id) {
    return this.getAll().find((u) => u.id === id) || null;
  },

  create(data) {
    const allUsers = this.getAll();
    const newUser = {
      id: Date.now(),
      ...data,
      role: data.role || "user",
    };
    allUsers.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
    return allUsers;
  },

  update(id, data) {
    const allUsers = this.getAll().map((u) =>
      u.id === id ? { ...u, ...data } : u
    );
    localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
    return allUsers;
  },

  remove(id) {
    const allUsers = this.getAll().filter((u) => u.id !== id);
    localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
    return allUsers;
  },
};
