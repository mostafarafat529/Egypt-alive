const styles = {
  New: "bg-blue-100 text-blue-700",
  Read: "bg-gray-100 text-gray-600",
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function Badge({ status }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
