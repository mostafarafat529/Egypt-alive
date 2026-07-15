import { useState } from "react";
import { useToast } from "../../components/ui/Toast";
import EmptyState from "../../components/ui/EmptyState";
import { FaHeart, FaMapMarkerAlt, FaSuitcase, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";

const initialFavorites = [
  { id: 1, type: "destination", title: "Cairo", subtitle: "The City of a Thousand Minarets", price: null },
  { id: 2, type: "tour", title: "Luxury Nile Cruise", subtitle: "5 Days · 2-10 people", price: "$890" },
  { id: 3, type: "destination", title: "Luxor", subtitle: "The world's greatest open-air museum", price: null },
];

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(initialFavorites);
  const { toast } = useToast();

  function handleRemove(id) {
    const item = favorites.find((f) => f.id === id);
    setFavorites((prev) => prev.filter((f) => f.id !== id));
    toast.info(`"${item?.title}" removed from favorites.`);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl text-primary mb-2">Favorites</h1>
        <p className="text-cream/60">Your saved destinations and tours.</p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={FaHeart}
          title="No favorites yet"
          description="Save destinations and tours you love."
          action="Explore Destinations"
          onAction={() => navigate(ROUTES.DESTINATIONS)}
          variant="dashboard"
        />
      ) : (
        <div className="space-y-3">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between hover:border-primary/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  {fav.type === "destination" ? <FaMapMarkerAlt className="text-primary" /> : <FaSuitcase className="text-primary" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-cream">{fav.title}</h3>
                    <span className="text-xs bg-white/10 text-cream/50 px-2 py-0.5 rounded-full capitalize">{fav.type}</span>
                  </div>
                  <p className="text-cream/40 text-sm mt-0.5">{fav.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {fav.price && <span className="font-heading text-primary text-lg">{fav.price}</span>}
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
