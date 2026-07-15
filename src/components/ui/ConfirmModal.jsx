import { useEffect } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const variants = {
    danger: {
      icon: "text-red-400 bg-red-400/10",
      button: "bg-red-500 hover:bg-red-600 text-white",
    },
    warning: {
      icon: "text-yellow-400 bg-yellow-400/10",
      button: "bg-yellow-500 hover:bg-yellow-600 text-white",
    },
  };

  const v = variants[variant];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition"
        >
          <FaTimes size={14} />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className={`w-14 h-14 rounded-full ${v.icon} flex items-center justify-center mb-4`}>
            <FaExclamationTriangle className="text-xl" />
          </div>
          <h3 className="font-heading text-xl text-dark mb-2">{title}</h3>
          <p className="text-gray-500 text-sm mb-6">{message}</p>
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
            >
              {cancelText}
            </button>
            <button
              onClick={() => { onConfirm(); onClose(); }}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition ${v.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
