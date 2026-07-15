import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes, FaTachometerAlt, FaCalendarCheck, FaUser, FaCog, FaSignOutAlt, FaUsers, FaSuitcase, FaEnvelope, FaMapMarkedAlt, FaHeart, FaBell } from "react-icons/fa";
import { ROUTES } from "../../config/routes";

import logo from "../../assets/logo/8bde5eb281dd3d316ed5b7cd4b93d99efeee103b (1).png";
import ProfileDropdown from "../common/ProfileDropdown.jsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/tour-packages", label: "Tour Packages" },
  { to: "/travel-blog", label: "Travel Blog" },
  { to: "/contact-us", label: "Contact Us" },
];

const userDashboardLinks = [
  { to: ROUTES.DASHBOARD, label: "Dashboard", icon: FaTachometerAlt },
  { to: ROUTES.DASHBOARD_BOOKINGS, label: "My Bookings", icon: FaCalendarCheck },
  { to: ROUTES.DASHBOARD_FAVORITES, label: "Favorites", icon: FaHeart },
  { to: ROUTES.DASHBOARD_PROFILE, label: "Profile", icon: FaUser },
  { to: ROUTES.DASHBOARD_NOTIFICATIONS, label: "Notifications", icon: FaBell },
  { to: ROUTES.DASHBOARD_SETTINGS, label: "Settings", icon: FaCog },
];

const adminDashboardLinks = [
  { to: ROUTES.ADMIN, label: "Admin Dashboard", icon: FaTachometerAlt },
  { to: ROUTES.ADMIN_USERS, label: "Users", icon: FaUsers },
  { to: ROUTES.ADMIN_TOURS, label: "Tours", icon: FaSuitcase },
  { to: ROUTES.ADMIN_BOOKINGS, label: "Bookings", icon: FaCalendarCheck },
  { to: ROUTES.ADMIN_DESTINATIONS, label: "Destinations", icon: FaMapMarkedAlt },
  { to: ROUTES.ADMIN_MESSAGES, label: "Messages", icon: FaEnvelope },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const dashboardLinks = user?.role === "admin" ? adminDashboardLinks : userDashboardLinks;
  const dashboardBase = user?.role === "admin" ? ROUTES.ADMIN : ROUTES.DASHBOARD;

  function handleMobileLogout() {
    logout();
    setIsOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Egypt Alive"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />

          <h1 className="font-heading text-xl md:text-2xl text-primary font-bold whitespace-nowrap">
            Egypt Alive
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-white rounded-full px-2 py-2 shadow-xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                  ? "bg-primary text-black"
                  : "text-black hover:bg-primary/20"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>


        {/* Desktop Auth / Profile Dropdown */}

        <div className="hidden lg:flex items-center gap-3">

          {isAuthenticated ? (
            <>
              <Link
                to={dashboardBase}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-medium hover:bg-primary hover:text-black transition-all duration-300"
              >
                <FaTachometerAlt className="text-xs" />
                Dashboard
              </Link>
              <ProfileDropdown />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-primary text-black font-semibold px-6 py-2 rounded-full hover:scale-105 transition"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-primary text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-black/95 backdrop-blur-md overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[600px] py-5" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "text-white hover:text-primary transition"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated && (
            <>
              <div className="w-10 h-px bg-white/10 my-1" />

              <Link
                to={dashboardBase}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-sm text-primary font-semibold"
              >
                <FaTachometerAlt className="text-xs" />
                Go to Dashboard
              </Link>

              <div className="w-10 h-px bg-white/10 my-1" />

              {dashboardLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-white/70 hover:text-primary transition"
                      }`
                    }
                  >
                    <Icon className="text-xs" />
                    {link.label}
                  </NavLink>
                );
              })}

              <div className="w-10 h-px bg-white/10 my-1" />

              <span className="text-white/50 text-xs">{user?.name}</span>

              <button
                onClick={handleMobileLogout}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition"
              >
                <FaSignOutAlt className="text-xs" />
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <div className="flex flex-col gap-3 mt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="border border-primary text-primary px-6 py-3 rounded-full text-center"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-black px-6 py-3 rounded-full text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
