export default function FactCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md text-center">
      <p className="text-primary font-bold text-lg">{value}</p>
      <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}
