const MESSAGES_KEY = "ea_messages";

export const messageService = {
  getAll() {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
  },

  create(data) {
    const messages = this.getAll();
    const newMessage = {
      id: Date.now(),
      ...data,
      status: "New",
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    return newMessage;
  },

  markAsRead(id) {
    const messages = this.getAll();
    const updated = messages.map((m) =>
      m.id === id ? { ...m, status: "Read" } : m
    );
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    return updated;
  },

  remove(id) {
    const messages = this.getAll().filter((m) => m.id !== id);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    return messages;
  },
};
