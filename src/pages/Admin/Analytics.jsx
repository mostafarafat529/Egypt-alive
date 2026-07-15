import { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { bookingService } from "../../services/bookingService";
import { messageService } from "../../services/messageService";
import { userService } from "../../services/userService";
import { FaUsers, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function AdminAnalytics() {
  const { tours } = useData();
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setBookings(bookingService.getAll());
    setMessages(messageService.getAll());
  }, []);

  const allUsers = userService.getAll();

  const totalRevenue = bookings
    .filter((b) => b.status === "Confirmed")
    .reduce((sum, b) => {
      const tour = tours.find((p) => p.title === b.tourTitle);
      const priceStr = tour?.price || "$0";
      return sum + parseInt(priceStr.replace("$", "")) * (b.guests || 1);
    }, 0);

  const metrics = [
    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "+12%", up: true, color: "text-green-400" },
    { label: "Total Users", value: allUsers.length, change: "+2", up: true, color: "text-blue-400" },
    { label: "Total Bookings", value: bookings.length, change: `+${bookings.filter((b) => b.status === "Pending").length} pending`, up: true, color: "text-primary" },
    { label: "Conversion Rate", value: "24%", change: "+3%", up: true, color: "text-purple-400" },
  ];

  const bookingsByStatus = [
    { status: "Pending", count: bookings.filter((b) => b.status === "Pending").length, color: "bg-yellow-400" },
    { status: "Confirmed", count: bookings.filter((b) => b.status === "Confirmed").length, color: "bg-green-400" },
    { status: "Cancelled", count: bookings.filter((b) => b.status === "Cancelled").length, color: "bg-red-400" },
  ];

  const maxBooking = Math.max(...bookingsByStatus.map((s) => s.count), 1);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl text-primary mb-2">Analytics</h1>
        <p className="text-cream/60">Track platform performance and insights.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-cream/50 text-sm mb-1">{m.label}</p>
            <p className="text-2xl font-bold text-cream">{m.value}</p>
            <div className={`flex items-center gap-1 mt-2 text-xs ${m.up ? "text-green-400" : "text-red-400"}`}>
              {m.up ? <FaArrowUp className="text-[10px]" /> : <FaArrowDown className="text-[10px]" />}
              {m.change}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="font-heading text-xl text-cream mb-6">Bookings by Status</h2>
        <div className="space-y-4">
          {bookingsByStatus.map((item) => (
            <div key={item.status}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-cream/70 text-sm">{item.status}</span>
                <span className="text-cream text-sm font-medium">{item.count}</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${(item.count / maxBooking) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="font-heading text-xl text-cream mb-6">Tour Performance</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.slice(0, 6).map((tour) => {
            const tourBookings = bookings.filter((b) => b.tourTitle === tour.title).length;
            return (
              <div key={tour.id} className="bg-white/5 rounded-xl p-4">
                <h3 className="text-cream font-medium text-sm mb-1">{tour.title}</h3>
                <p className="text-cream/40 text-xs mb-3">{tourBookings} bookings</p>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${Math.max((tourBookings / Math.max(bookings.length, 1)) * 100, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
