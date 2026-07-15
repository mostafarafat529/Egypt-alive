import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout.jsx";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import AdminLayout from "../components/layout/AdminLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";

import Home from "../pages/Home/index.jsx";
import Destinations from "../pages/Destinations/Distinations.jsx";
import DestinationDetails from "../pages/Destinations/DestinationDetails.jsx";
import TourPackages from "../pages/TourPackages/TourPackages.jsx";
import TourDetails from "../pages/TourPackages/TourDetails.jsx";
import TravelBlog from "../pages/TravelBlog/TravelBlog.jsx";
import BlogDetails from "../pages/TravelBlog/BlogDetails.jsx";
import ContactUs from "../pages/ContactUs/ContactUs.jsx";

import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";

import Booking from "../pages/Booking/index.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";

import DashboardHome from "../pages/Dashboard/DashboardHome.jsx";
import Profile from "../pages/Dashboard/Profile.jsx";
import MyBookings from "../pages/Dashboard/MyBookings.jsx";
import Favorites from "../pages/Dashboard/Favorites.jsx";
import Settings from "../pages/Dashboard/Settings.jsx";
import Notifications from "../pages/Dashboard/Notifications.jsx";

import AdminDashboard from "../pages/Admin/Dashboard.jsx";
import AdminUsers from "../pages/Admin/Users.jsx";
import AdminTours from "../pages/Admin/Tours.jsx";
import AdminBookings from "../pages/Admin/Bookings.jsx";
import AdminDestinations from "../pages/Admin/Destinations.jsx";
import AdminBlog from "../pages/Admin/Blog.jsx";
import AdminMessages from "../pages/Admin/Messages.jsx";
import AdminAnalytics from "../pages/Admin/Analytics.jsx";
import AdminSettings from "../pages/Admin/Settings.jsx";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Auth Pages - Public Only */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Main Pages with Navbar + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/tour-packages" element={<TourPackages />} />
        <Route path="/tour-packages/:id" element={<TourDetails />} />
        <Route path="/travel-blog" element={<TravelBlog />} />
        <Route path="/travel-blog/:id" element={<BlogDetails />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route
          path="/booking/:tourId"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* User Dashboard */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/bookings" element={<MyBookings />} />
        <Route path="/dashboard/favorites" element={<Favorites />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
      </Route>

      {/* Admin Dashboard */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/tours" element={<AdminTours />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/destinations" element={<AdminDestinations />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
