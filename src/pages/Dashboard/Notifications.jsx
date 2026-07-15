import { useState } from "react";
import { useToast } from "../../components/ui/Toast";
import EmptyState from "../../components/ui/EmptyState";
import { FaBell, FaCheck, FaTrash, FaCalendarCheck, FaEnvelope, FaHeart } from "react-icons/fa";

const initialNotifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    message: "Your Classic Cairo tour has been confirmed for July 20, 2026.",
    time: "2 hours ago",
    read: false,
    icon: FaCalendarCheck,
    color: "text-green-400",
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    message: "Our team replied to your inquiry about the Nile Cruise itinerary.",
    time: "1 day ago",
    read: false,
    icon: FaEnvelope,
    color: "text-blue-400",
  },
  {
    id: 3,
    type: "promotion",
    title: "Special Offer",
    message: "Get 15% off on Luxury Nile Cruise. Limited time offer!",
    time: "3 days ago",
    read: true,
    icon: FaHeart,
    color: "text-primary",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const { toast } = useToast();

  function markAsRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  }

  function handleDelete(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.info("Notification deleted.");
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-primary mb-2">Notifications</h1>
          <p className="text-cream/60">
            Stay updated with your latest activity.
            {unreadCount > 0 && <span className="ml-2 text-primary font-medium">{unreadCount} unread</span>}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-cream/50 hover:text-cream transition flex items-center gap-2"
          >
            <FaCheck className="text-xs" /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={FaBell}
          title="All caught up!"
          description="No new notifications."
          variant="dashboard"
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`border rounded-xl p-5 flex items-start gap-4 transition-all duration-200 hover:border-primary/30 ${
                  notif.read ? "bg-white/5 border-white/10" : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                  <Icon className="text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-cream text-sm">{notif.title}</h3>
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <p className="text-cream/50 text-sm mt-1">{notif.message}</p>
                  <p className="text-cream/30 text-xs mt-2">{notif.time}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!notif.read && (
                    <button
                      onClick={() => { markAsRead(notif.id); toast.success("Marked as read."); }}
                      className="text-cream/30 hover:text-primary transition p-2 rounded-lg hover:bg-white/5"
                      title="Mark as read"
                    >
                      <FaCheck className="text-xs" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="text-cream/30 hover:text-red-400 transition p-2 rounded-lg hover:bg-white/5"
                    title="Delete"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
