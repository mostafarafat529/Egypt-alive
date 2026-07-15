import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { bookingService } from "../../services/bookingService";
import Badge from "../../components/ui/Badge";
import { FaCalendarCheck, FaHeart, FaSuitcase, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";

export default function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      setBookings(bookingService.getByUser(user.email));
    }
  }, [user]);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed").length;

  const stats = [
    { label: "Total Bookings", value: totalBookings, icon: FaSuitcase, color: "text-primary" },
    { label: "Pending", value: pendingBookings, icon: FaCalendarCheck, color: "text-yellow-400" },
    { label: "Confirmed", value: confirmedBookings, icon: FaHeart, color: "text-green-400" },
    { label: "Notifications", value: 0, icon: FaBell, color: "text-blue-400" },
  ];

  const recentBookings = bookings.slice(-3).reverse();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-8">
        <h1 className="font-heading text-3xl text-cream mb-2">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-cream/60">
          Manage your bookings and account from here. Ready for your next adventure?
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/30 transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <Icon className="text-lg" />
                </div>
              </div>
              <p className="text-2xl font-bold text-cream">{stat.value}</p>
              <p className="text-cream/50 text-sm mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl text-cream">Recent Bookings</h2>
          <button
            onClick={() => navigate(ROUTES.DASHBOARD_BOOKINGS)}
            className="text-sm text-primary hover:text-primary-light transition"
          >
            View All
          </button>
        </div>
        {recentBookings.length === 0 ? (
          <div className="bg-white/5 rounded-xl p-10 text-center text-cream/40">
            <FaSuitcase className="text-4xl mx-auto mb-4 text-cream/20" />
            <p>No bookings yet. Start planning your trip!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-primary/20 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FaSuitcase className="text-primary text-sm" />
                  </div>
                  <div>
                    <h3 className="font-medium text-cream text-sm">{booking.tourTitle}</h3>
                    <p className="text-cream/40 text-xs mt-0.5">
                      {new Date(booking.travelDate).toLocaleDateString()} · {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                    </p>
                  </div>
                </div>
                <Badge status={booking.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate(ROUTES.TOUR_PACKAGES)}
          className="bg-white/5 border border-white/10 rounded-xl p-5 text-left hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-200 group"
        >
          <FaSuitcase className="text-primary text-xl mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-medium text-cream text-sm">Browse Tours</h3>
          <p className="text-cream/40 text-xs mt-1">Find your next adventure</p>
        </button>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_BOOKINGS)}
          className="bg-white/5 border border-white/10 rounded-xl p-5 text-left hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-200 group"
        >
          <FaCalendarCheck className="text-primary text-xl mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-medium text-cream text-sm">My Bookings</h3>
          <p className="text-cream/40 text-xs mt-1">Manage your reservations</p>
        </button>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_PROFILE)}
          className="bg-white/5 border border-white/10 rounded-xl p-5 text-left hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-200 group"
        >
          <FaHeart className="text-primary text-xl mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-medium text-cream text-sm">Edit Profile</h3>
          <p className="text-cream/40 text-xs mt-1">Update your information</p>
        </button>
      </div>
    </div>
  );
}
