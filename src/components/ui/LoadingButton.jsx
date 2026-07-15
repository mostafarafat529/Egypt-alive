import { FaSpinner } from "react-icons/fa";

export default function LoadingButton({
  children,
  loading = false,
  disabled = false,
  loadingText = "Loading...",
  className = "",
  ...props
}) {
  return (
    <button
      disabled={loading || disabled}
      className={`relative inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none ${className}`}
      {...props}
    >
      {loading && <FaSpinner className="animate-spin text-sm" />}
      {loading ? loadingText : children}
    </button>
  );
}
