import { NavLink, Outlet, useNavigate } from "react-router-dom";
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

  return (
    <div className="min-h-screen flex bg-dark text-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-[#11100C] border-r border-primary/10 flex flex-col max-lg:hidden">
        <div className="p-6 border-b border-primary/10">
          <h2 className="font-heading text-xl text-primary">My Dashboard</h2>
          <p className="text-cream/60 text-sm mt-1">{user?.name}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
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

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#11100C] border-b border-primary/10 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-2 text-sm text-cream/70 hover:text-primary transition"
        >
          <FaArrowLeft />
          <span>Back to Website</span>
        </button>
        <span className="font-heading text-lg text-primary">Dashboard</span>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 pt-20 lg:pt-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
