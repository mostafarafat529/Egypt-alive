import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../config/routes";
import {
  FaUser,
  FaTachometerAlt,
  FaCalendarCheck,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaSuitcase,
  FaEnvelope,
  FaMapMarkedAlt,
  FaChevronDown,
  FaPenFancy,
  FaChartBar,
  FaHeart,
  FaBell,
} from "react-icons/fa";

const userMenu = [
  { to: ROUTES.DASHBOARD, label: "Dashboard", icon: FaTachometerAlt },
  { to: ROUTES.DASHBOARD_BOOKINGS, label: "My Bookings", icon: FaCalendarCheck },
  { to: ROUTES.DASHBOARD_FAVORITES, label: "Favorites", icon: FaHeart },
  { to: ROUTES.DASHBOARD_PROFILE, label: "Profile", icon: FaUser },
  { to: ROUTES.DASHBOARD_NOTIFICATIONS, label: "Notifications", icon: FaBell },
  { to: ROUTES.DASHBOARD_SETTINGS, label: "Settings", icon: FaCog },
];

const adminMenu = [
  { to: ROUTES.ADMIN, label: "Admin Dashboard", icon: FaTachometerAlt },
  { to: ROUTES.ADMIN_USERS, label: "Users", icon: FaUsers },
  { to: ROUTES.ADMIN_TOURS, label: "Tours", icon: FaSuitcase },
  { to: ROUTES.ADMIN_BOOKINGS, label: "Bookings", icon: FaCalendarCheck },
  { to: ROUTES.ADMIN_DESTINATIONS, label: "Destinations", icon: FaMapMarkedAlt },
  { to: ROUTES.ADMIN_BLOG, label: "Blog", icon: FaPenFancy },
  { to: ROUTES.ADMIN_MESSAGES, label: "Messages", icon: FaEnvelope },
  { to: ROUTES.ADMIN_ANALYTICS, label: "Analytics", icon: FaChartBar },
  { to: ROUTES.ADMIN_SETTINGS, label: "Settings", icon: FaCog },
];

export default function ProfileDropdown({ onCloseMobile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "admin";
  const menuItems = isAdmin ? adminMenu : userMenu;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleItemClick(to) {
    setOpen(false);
    if (onCloseMobile) onCloseMobile();
    navigate(to);
  }

  function handleLogout() {
    setOpen(false);
    if (onCloseMobile) onCloseMobile();
    logout();
    navigate("/");
  }

  const initial = user?.name?.charAt(0).toUpperCase() || "?";

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 hover:border-primary/50 transition-colors duration-300 group"
      >
        {/* Avatar Circle */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold text-sm">
          {initial}
        </div>

        <span className="hidden sm:inline text-white text-sm font-medium max-w-[100px] truncate">
          {user?.name}
        </span>

        <FaChevronDown
          className={`text-primary text-xs transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-2 w-64 bg-[#11100C] border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-cream/50 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <div className="mt-2">
            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
              isAdmin ? "bg-primary/20 text-primary" : "bg-blue-500/20 text-blue-400"
            }`}>
              {user?.role === "admin" ? "Administrator" : "Member"}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1 max-h-[300px] overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.to}
                onClick={() => handleItemClick(item.to)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-cream/70 hover:bg-white/5 hover:text-cream transition-colors duration-150"
              >
                <Icon className="text-xs w-4 text-center" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Divider + Logout */}
        <div className="border-t border-white/10 py-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-150"
          >
            <FaSignOutAlt className="text-xs w-4 text-center" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
