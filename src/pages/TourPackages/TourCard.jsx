import { FaClock, FaUsers, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TourCard({ id, image, title, subtitle, duration, people, price, rating, reviewCount }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {rating && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md">
            <FaStar className="text-primary text-xs" />
            <span className="text-dark text-xs font-bold">{rating}</span>
            <span className="text-gray-400 text-[10px]">({reviewCount})</span>
          </div>
        )}
      </div>

      <div className="p-6">

        {subtitle && (
          <p className="text-primary text-xs font-semibold uppercase tracking-[2px] mb-2">
            {subtitle}
          </p>
        )}

        <h3 className="font-heading text-2xl text-dark mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex justify-between text-gray-500 text-sm mb-5">

          <span className="flex items-center gap-2">
            <FaClock className="text-primary" />
            {duration}
          </span>

          <span className="flex items-center gap-2">
            <FaUsers className="text-primary" />
            {people}
          </span>

        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">

          <div>
            <span className="text-primary text-2xl font-bold">
              {price}
            </span>
            <span className="text-gray-400 text-xs ml-1">/ person</span>
          </div>

          <Link
            to={`/tour-packages/${id}`}
            className="bg-primary text-dark px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-dark hover:scale-105 transition-all duration-200"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
}
