import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaLock, FaSave } from "react-icons/fa";
import ToastContainer, { useToast } from "../../components/ui/Toast";

export default function Settings() {
  const { changePassword } = useAuth();
  const { toasts, addToast, removeToast } = useToast();
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleUpdatePassword() {
    if (!form.current.trim()) {
      addToast("Please enter your current password.", "error");
      return;
    }
    if (!form.newPass.trim()) {
      addToast("Please enter a new password.", "error");
      return;
    }
    if (form.newPass.length < 6) {
      addToast("New password must be at least 6 characters.", "error");
      return;
    }
    if (form.newPass !== form.confirm) {
      addToast("New password and confirmation do not match.", "error");
      return;
    }

    const result = changePassword(form.current, form.newPass);
    if (result.success) {
      addToast(result.message);
      setForm({ current: "", newPass: "", confirm: "" });
    } else {
      addToast(result.message, "error");
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-heading text-3xl text-primary mb-2">Settings</h1>
        <p className="text-cream/60">Manage your account preferences.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FaLock className="text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-lg text-cream">Change Password</h2>
            <p className="text-cream/40 text-sm">Update your account password</p>
          </div>
        </div>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Current Password</label>
            <input
              type="password"
              name="current"
              value={form.current}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">New Password</label>
            <input
              type="password"
              name="newPass"
              value={form.newPass}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          <button
            onClick={handleUpdatePassword}
            className="bg-primary text-dark font-semibold px-6 py-3 rounded-xl text-sm hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <FaSave className="text-xs" />
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
