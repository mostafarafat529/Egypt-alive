import { FaCheck } from "react-icons/fa";

export default function Highlights({ items, title = "Highlights" }) {
  return (
    <div>
      <h3 className="font-heading text-2xl text-dark mb-5">{title}</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FaCheck className="text-primary text-xs" />
            </div>
            <span className="text-gray-600 leading-7">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
