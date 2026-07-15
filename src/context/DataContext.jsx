import { createContext, useContext, useState, useCallback } from "react";
import { packages } from "../data/tourpachages";
import { destinationspage } from "../data/destinations";
import { blogs } from "../data/blogs";

const DataContext = createContext(null);

const TOURS_KEY = "ea_tours";
const DEST_KEY = "ea_destinations";
const BLOG_KEY = "ea_blogs";

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return fallback;
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function DataProvider({ children }) {
  const [tours, setTours] = useState(() => loadFromStorage(TOURS_KEY, packages));
  const [destinations, setDestinations] = useState(() => loadFromStorage(DEST_KEY, destinationspage));
  const [allBlogs, setAllBlogs] = useState(() => loadFromStorage(BLOG_KEY, blogs));

  const updateTours = useCallback((updater) => {
    setTours((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToStorage(TOURS_KEY, next);
      return next;
    });
  }, []);

  const updateDestinations = useCallback((updater) => {
    setDestinations((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToStorage(DEST_KEY, next);
      return next;
    });
  }, []);

  const updateBlogs = useCallback((updater) => {
    setAllBlogs((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToStorage(BLOG_KEY, next);
      return next;
    });
  }, []);

  const value = {
    tours,
    destinations,
    blogs: allBlogs,
    updateTours,
    updateDestinations,
    updateBlogs,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
