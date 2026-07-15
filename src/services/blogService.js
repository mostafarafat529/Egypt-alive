import { blogs } from "../data/blogs";

const BLOG_KEY = "ea_blogs";

function init() {
  if (!localStorage.getItem(BLOG_KEY)) {
    localStorage.setItem(BLOG_KEY, JSON.stringify(blogs));
  }
}

export const blogService = {
  getAll() {
    init();
    return JSON.parse(localStorage.getItem(BLOG_KEY));
  },

  getById(id) {
    return this.getAll().find((b) => b.id === id) || null;
  },

  create(data) {
    const allBlogs = this.getAll();
    const newBlog = {
      id: Date.now(),
      ...data,
      date: data.date || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
    allBlogs.push(newBlog);
    localStorage.setItem(BLOG_KEY, JSON.stringify(allBlogs));
    return allBlogs;
  },

  update(id, data) {
    const allBlogs = this.getAll().map((b) =>
      b.id === id ? { ...b, ...data } : b
    );
    localStorage.setItem(BLOG_KEY, JSON.stringify(allBlogs));
    return allBlogs;
  },

  remove(id) {
    const allBlogs = this.getAll().filter((b) => b.id !== id);
    localStorage.setItem(BLOG_KEY, JSON.stringify(allBlogs));
    return allBlogs;
  },
};
