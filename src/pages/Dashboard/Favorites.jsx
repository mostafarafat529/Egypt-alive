import { useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaSuitcase, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import ToastContainer, { useToast } from "../../components/ui/Toast";

const initialFavorites = [
  {
    id: 1,
    type: "destination",
    title: "Cairo",
    subtitle: "The City of a Thousand Minarets",
    price: null,
  },
  {
    id: 2,
    type: "tour",
    title: "Luxury Nile Cruise",
    subtitle: "5 Days · 2-10 people",
    price: "$890",
  },
  {
    id: 3,
    type: "destination",
    title: "Luxor",
    subtitle: "The world's greatest open-air museum",
    price: null,
  },
];

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(initialFavorites);
  const { toasts, addToast, removeToast } = useToast();

  function handleRemove(id) {
    const item = favorites.find((f) => f.id === id);
    setFavorites((prev) => prev.filter((f) => f.id !== id));
    addToast(`"${item?.title}" removed from favorites.`);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-heading text-3xl text-primary mb-2">Favorites</h1>
        <p className="text-cream/60">Your saved destinations and tours.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white/5 rounded-2xl p-16 text-center">
          <FaHeart className="text-5xl mx-auto mb-4 text-cream/15" />
          <h3 className="font-heading text-xl text-cream/60 mb-2">No favorites yet</h3>
          <p className="text-cream/40 text-sm mb-6">Save destinations and tours you love.</p>
          <button
            onClick={() => navigate(ROUTES.DESTINATIONS)}
            className="bg-primary text-dark font-semibold px-6 py-3 rounded-xl text-sm hover:scale-105 transition-all duration-200"
          >
            Explore Destinations
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between hover:border-primary/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  {fav.type === "destination" ? (
                    <FaMapMarkerAlt className="text-primary" />
                  ) : (
                    <FaSuitcase className="text-primary" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-cream">{fav.title}</h3>
                    <span className="text-xs bg-white/10 text-cream/50 px-2 py-0.5 rounded-full capitalize">
                      {fav.type}
                    </span>
                  </div>
                  <p className="text-cream/40 text-sm mt-0.5">{fav.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {fav.price && (
                  <span className="font-heading text-primary text-lg">{fav.price}</span>
                )}
                <button
                  onClick={() => handleRemove(fav.id)}
                  className="text-cream/30 hover:text-red-400 transition p-2 rounded-lg hover:bg-white/5"
                  title="Remove from favorites"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
