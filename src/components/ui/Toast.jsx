import { useState, useCallback } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-20 right-4 z-[100] space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-slide-in ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <FaCheckCircle className="text-lg flex-shrink-0" />
          ) : (
            <FaExclamationCircle className="text-lg flex-shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => onRemove(toast.id)}
            className="ml-2 text-white/70 hover:text-white flex-shrink-0"
          >
            <FaTimes size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
