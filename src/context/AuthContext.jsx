import { createContext, useState, useEffect } from "react";
import { STORAGE_KEYS } from "../constants/storage.js";
import { userService } from "../services/userService.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const STORAGE_KEY = STORAGE_KEYS.USER;

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (fields) => {
    const updated = { ...user, ...fields };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (user?.id) {
      userService.update(user.id, fields);
    }
  };

  const changePassword = (currentPassword, newPassword) => {
    if (!user?.id) return { success: false, message: "No user found." };

    const allUsers = userService.getAll();
    const found = allUsers.find((u) => u.id === user.id);
    if (!found) return { success: false, message: "User not found." };

    if (found.password !== currentPassword) {
      return { success: false, message: "Current password is incorrect." };
    }

    userService.update(user.id, { password: newPassword });
    const updated = { ...user, password: newPassword };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true, message: "Password updated successfully." };
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
