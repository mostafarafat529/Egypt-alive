import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useData } from "../../context/DataContext";
import { bookingService } from "../../services/bookingService";
import { messageService } from "../../services/messageService";
import { userService } from "../../services/userService";
import Badge from "../../components/ui/Badge";
import { FaUsers, FaSuitcase, FaCalendarCheck, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { tours, destinations } = useData();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setBookings(bookingService.getAll());
    setMessages(messageService.getAll());
  }, []);

  const allUsers = userService.getAll();

  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const unreadMessages = messages.filter((m) => m.status === "New").length;

  const stats = [
    { label: "Total Users", value: allUsers.length, icon: FaUsers, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Tours", value: tours.length, icon: FaSuitcase, color: "text-primary", bg: "bg-primary/10" },
    { label: "Bookings", value: bookings.length, icon: FaCalendarCheck, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Destinations", value: destinations.length, icon: FaMapMarkerAlt, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Messages", value: messages.length, icon: FaEnvelope, color: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Pending", value: pendingBookings, icon: FaClock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  ];

  const recentBookings = bookings.slice(-5).reverse();
  const recentMessages = messages.slice(-5).reverse();

  const quickActions = [
    { label: "Manage Users", route: ROUTES.ADMIN_USERS, icon: FaUsers },
    { label: "Manage Tours", route: ROUTES.ADMIN_TOURS, icon: FaSuitcase },
    { label: "Bookings", route: ROUTES.ADMIN_BOOKINGS, icon: FaCalendarCheck },
    { label: "Messages", route: ROUTES.ADMIN_MESSAGES, icon: FaEnvelope },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-8">
        <h1 className="font-heading text-3xl text-cream mb-2">
          Admin Dashboard
        </h1>
        <p className="text-cream/60">
          Welcome back, {user?.name}. Here&apos;s what&apos;s happening on your platform.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/30 transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color}`}>
                  <Icon className="text-lg" />
                </div>
              </div>
              <p className="text-2xl font-bold text-cream">{stat.value}</p>
              <p className="text-cream/50 text-sm mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="font-heading text-xl text-cream mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => navigate(action.route)}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-left hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-200 group"
              >
                <Icon className="text-primary text-xl mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-cream text-sm font-medium">{action.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl text-cream">Recent Bookings</h2>
            <button
              onClick={() => navigate(ROUTES.ADMIN_BOOKINGS)}
              className="text-sm text-primary hover:text-primary-light transition flex items-center gap-1"
            >
              View All <FaArrowRight className="text-xs" />
            </button>
          </div>
          {recentBookings.length === 0 ? (
            <div className="bg-white/5 rounded-xl p-8 text-center text-cream/40 text-sm">
              No bookings yet.
            </div>
          ) : (
            <div className="space-y-2">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-primary/20 transition-all duration-200">
                  <div>
                    <p className="text-cream text-sm font-medium">{booking.userName}</p>
                    <p className="text-cream/40 text-xs mt-0.5">{booking.tourTitle}</p>
                  </div>
                  <Badge status={booking.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl text-cream">Recent Messages</h2>
            <button
              onClick={() => navigate(ROUTES.ADMIN_MESSAGES)}
              className="text-sm text-primary hover:text-primary-light transition flex items-center gap-1"
            >
              View All <FaArrowRight className="text-xs" />
            </button>
          </div>
          {recentMessages.length === 0 ? (
            <div className="bg-white/5 rounded-xl p-8 text-center text-cream/40 text-sm">
              No messages yet.
            </div>
          ) : (
            <div className="space-y-2">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-primary/20 transition-all duration-200">
                  <div>
                    <p className="text-cream text-sm font-medium">{msg.name}</p>
                    <p className="text-cream/40 text-xs mt-0.5">{msg.subject}</p>
                  </div>
                  <Badge status={msg.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {unreadMessages > 0 && (
        <div className="bg-orange-400/10 border border-orange-400/20 rounded-xl p-4 flex items-center gap-3">
          <FaEnvelope className="text-orange-400" />
          <p className="text-cream text-sm">
            You have <span className="font-semibold text-orange-400">{unreadMessages}</span> unread message{unreadMessages > 1 ? "s" : ""}.{" "}
            <button onClick={() => navigate(ROUTES.ADMIN_MESSAGES)} className="underline hover:text-orange-300 transition">
              View now
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
