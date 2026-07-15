import { useState, useEffect, useCallback } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const remove = useCallback(() => {
    setValue(initialValue);
    localStorage.removeItem(key);
  }, [key, initialValue]);

  return [value, setValue, remove];
}
