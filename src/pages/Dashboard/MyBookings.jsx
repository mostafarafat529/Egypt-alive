import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { bookingService } from "../../services/bookingService";
import { useToast } from "../../components/ui/Toast";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { FaCalendar, FaUsers, FaSuitcase, FaStickyNote, FaBan } from "react-icons/fa";

export default function MyBookings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [cancelTarget, setCancelTarget] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setBookings(bookingService.getByUser(user.email));
    }
  }, [user]);

  function handleCancel() {
    if (cancelTarget) {
      setBookings(bookingService.updateStatus(cancelTarget.id, "Cancelled"));
      toast.success("Booking cancelled successfully.");
      setCancelTarget(null);
    }
  }

  const statuses = ["All", "Pending", "Confirmed", "Cancelled"];
  const filtered = filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl text-primary mb-2">My Bookings</h1>
        <p className="text-cream/60">View and manage your travel bookings.</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === s
                ? "bg-primary text-black shadow-md shadow-primary/20"
                : "bg-white/5 text-cream/60 hover:bg-white/10 hover:text-cream"
            }`}
          >
            {s}
            {s !== "All" && (
              <span className="ml-1.5 text-xs opacity-70">
                {bookings.filter((b) => b.status === s).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FaSuitcase}
          title={filter === "All" ? "No bookings yet" : `No ${filter.toLowerCase()} bookings`}
          description={filter === "All" ? "Start planning your Egyptian adventure!" : "Try a different filter."}
          action={filter === "All" ? "Browse Tours" : null}
          onAction={filter === "All" ? () => window.location.href = "/tour-packages" : undefined}
          variant="dashboard"
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((booking) => (
            <div
              key={booking.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FaSuitcase className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-cream">{booking.tourTitle}</h3>
                    <p className="text-cream/40 text-xs">
                      Booked {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge status={booking.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm text-cream/60">
                  <FaCalendar className="text-primary text-xs w-4" />
                  <span>{new Date(booking.travelDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-cream/60">
                  <FaUsers className="text-primary text-xs w-4" />
                  <span>{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</span>
                </div>
              </div>

              {booking.notes && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-start gap-2 text-sm text-cream/40">
                    <FaStickyNote className="text-xs mt-0.5 w-4 flex-shrink-0" />
                    <p className="line-clamp-2">{booking.notes}</p>
                  </div>
                </div>
              )}

              {booking.status === "Pending" && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => setCancelTarget(booking)}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition px-4 py-2 rounded-lg hover:bg-red-400/10 w-full justify-center"
                  >
                    <FaBan className="text-xs" /> Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        title="Cancel Booking"
        message={`Are you sure you want to cancel your booking for "${cancelTarget?.tourTitle}"? This cannot be undone.`}
        confirmText="Yes, Cancel"
        variant="danger"
      />
    </div>
  );
}
