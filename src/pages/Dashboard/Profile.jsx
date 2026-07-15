import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ToastContainer, { useToast } from "../../components/ui/Toast";
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaIdBadge, FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { toasts, addToast, removeToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) {
      addToast("Name and email are required.", "error");
      return;
    }
    updateProfile({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
    setEditing(false);
    addToast("Profile updated successfully.");
  }

  function handleCancel() {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setEditing(false);
  }

  const displayPhone = user?.phone || "Not set";

  return (
    <div className="space-y-6 animate-fade-in">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-heading text-3xl text-primary mb-2">Profile</h1>
        <p className="text-cream/60">View and update your personal information.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 to-primary/10 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center border-4 border-dark text-dark text-3xl font-heading font-bold shadow-xl">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
        </div>

        <div className="pt-16 px-8 pb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-heading text-2xl text-cream">{user?.name}</h2>
              <p className="text-cream/50 text-sm mt-1 capitalize flex items-center gap-2">
                <FaIdBadge className="text-primary text-xs" />
                {user?.role === "admin" ? "Administrator" : "Member"}
              </p>
            </div>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary-light transition px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20"
              >
                <FaEdit className="text-xs" />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 text-sm text-cream/60 hover:text-cream transition px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <FaTimes className="text-xs" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 text-sm text-dark bg-primary hover:bg-primary-light transition px-4 py-2 rounded-lg font-semibold"
                >
                  <FaSave className="text-xs" />
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FaUser className="text-primary text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-cream/40 text-xs">Full Name</p>
                  {editing ? (
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-cream text-sm outline-none focus:border-primary transition mt-1"
                    />
                  ) : (
                    <p className="text-cream text-sm font-medium">{user?.name}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FaEnvelope className="text-primary text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-cream/40 text-xs">Email Address</p>
                  {editing ? (
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-cream text-sm outline-none focus:border-primary transition mt-1"
                    />
                  ) : (
                    <p className="text-cream text-sm font-medium">{user?.email}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FaPhone className="text-primary text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-cream/40 text-xs">Phone Number</p>
                  {editing ? (
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-cream text-sm outline-none focus:border-primary transition mt-1"
                      placeholder="Add phone number"
                    />
                  ) : (
                    <p className="text-cream text-sm font-medium">{displayPhone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FaCalendar className="text-primary text-sm" />
                </div>
                <div>
                  <p className="text-cream/40 text-xs">Member Since</p>
                  <p className="text-cream text-sm font-medium">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
