import { FaLightbulb } from "react-icons/fa";

export default function TravelTips({ tips }) {
  return (
    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <FaLightbulb className="text-primary" />
        <h3 className="font-heading text-xl text-dark">Travel Tips</h3>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-7">
            <span className="text-primary font-bold mt-0.5">{i + 1}.</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
