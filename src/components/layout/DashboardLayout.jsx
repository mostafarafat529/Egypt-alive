import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../config/routes";
import {
  FaUser,
  FaCalendarCheck,
  FaHeart,
  FaCog,
  FaBell,
  FaHome,
  FaSignOutAlt,
  FaArrowLeft,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const sidebarLinks = [
  { to: ROUTES.DASHBOARD, label: "Dashboard", icon: FaHome, end: true },
  { to: ROUTES.DASHBOARD_PROFILE, label: "Profile", icon: FaUser },
  { to: ROUTES.DASHBOARD_BOOKINGS, label: "My Bookings", icon: FaCalendarCheck },
  { to: ROUTES.DASHBOARD_FAVORITES, label: "Favorites", icon: FaHeart },
  { to: ROUTES.DASHBOARD_NOTIFICATIONS, label: "Notifications", icon: FaBell },
  { to: ROUTES.DASHBOARD_SETTINGS, label: "Settings", icon: FaCog },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const initial = user?.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen flex bg-dark text-cream">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#11100C] border-r border-primary/10 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="p-6 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl text-primary">My Dashboard</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cream/60 hover:text-cream transition"
            >
              <FaTimes size={14} />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-sm">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-cream text-sm font-medium truncate">{user?.name}</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-400 uppercase tracking-wider">
                Member
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-black font-semibold shadow-lg shadow-primary/20"
                      : "text-cream/70 hover:bg-white/5 hover:text-cream hover:translate-x-1"
                  }`
                }
              >
                <Icon className="text-base" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary/10 space-y-2">
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-cream/70 hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <FaArrowLeft />
            Back to Website
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-cream/70 hover:bg-white/5 hover:text-cream transition-all duration-200"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile Top Bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#11100C] border-b border-primary/10 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-sm text-cream/70 hover:text-primary transition"
          >
            <FaBars className="text-lg" />
          </button>
          <span className="font-heading text-lg text-primary">Dashboard</span>
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="flex items-center gap-2 text-sm text-cream/70 hover:text-primary transition"
          >
            <FaArrowLeft className="text-sm" />
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
