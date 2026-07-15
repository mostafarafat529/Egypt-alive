import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BackButton({ label = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition text-sm mb-6"
    >
      <FaArrowLeft />
      {label}
    </button>
  );
}
