import { FaStar } from "react-icons/fa";

export default function ReviewCard({ name, rating, comment, date }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-dark text-sm">{name}</p>
            <p className="text-gray-400 text-xs">{date}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={`text-sm ${i < rating ? "text-primary" : "text-gray-200"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600 leading-7 text-sm">{comment}</p>
    </div>
  );
}
