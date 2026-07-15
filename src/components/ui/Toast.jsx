import { createContext, useContext, useState, useCallback } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const ToastContext = createContext(null);

let toastId = 0;

const typeConfig = {
  success: { icon: FaCheckCircle, bg: "bg-emerald-500", ring: "ring-emerald-400/30" },
  error: { icon: FaExclamationCircle, bg: "bg-red-500", ring: "ring-red-400/30" },
  warning: { icon: FaExclamationTriangle, bg: "bg-amber-500", ring: "ring-amber-400/30" },
  info: { icon: FaInfoCircle, bg: "bg-blue-500", ring: "ring-blue-400/30" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3500) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, "success", dur),
    error: (msg, dur) => addToast(msg, "error", dur),
    warning: (msg, dur) => addToast(msg, "warning", dur),
    info: (msg, dur) => addToast(msg, "info", dur),
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-20 right-4 z-[100] space-y-3 pointer-events-none">
      {toasts.map((t) => {
        const cfg = typeConfig[t.type] || typeConfig.success;
        const Icon = cfg.icon;
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium ring-1 ${cfg.ring} ${cfg.bg} text-white min-w-[280px] max-w-[420px] animate-slide-in`}
          >
            <Icon className="text-lg flex-shrink-0" />
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => onRemove(t.id)}
              className="ml-2 text-white/70 hover:text-white flex-shrink-0 transition"
            >
              <FaTimes size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
