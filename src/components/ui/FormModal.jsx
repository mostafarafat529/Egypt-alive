import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function FormModal({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[85vh] overflow-y-auto`}>
        <div className="sticky top-0 bg-white border-b border-gray-100 rounded-t-2xl flex items-center justify-between px-6 py-4 z-10">
          <h2 className="font-heading text-xl text-dark">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition"
          >
            <FaTimes size={14} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
