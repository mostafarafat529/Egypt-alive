import { Link } from "react-router-dom";
import { FaClock, FaUsers } from "react-icons/fa";

export default function StickyBookingCard({ price, duration, people, tourId }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
      <div className="text-center mb-6">
        <span className="text-primary text-3xl font-bold">{price}</span>
        <span className="text-gray-400 text-sm ml-1">/ person</span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <FaClock className="text-primary" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <FaUsers className="text-primary" />
          <span>{people} people</span>
        </div>
      </div>

      <Link
        to={`/booking/${tourId}`}
        className="block w-full text-center bg-primary text-dark py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
      >
        Book Now
      </Link>

      <p className="text-center text-xs text-gray-400 mt-3">
        Free cancellation up to 48 hours before
      </p>
    </div>
  );
}
