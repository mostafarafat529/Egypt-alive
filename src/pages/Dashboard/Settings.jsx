import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../components/ui/Toast";
import LoadingButton from "../../components/ui/LoadingButton";
import { FaLock, FaSave } from "react-icons/fa";

function validate(form) {
  const errors = {};
  if (!form.current.trim()) errors.current = "Current password is required";
  if (!form.newPass.trim()) errors.newPass = "New password is required";
  else if (form.newPass.length < 8) errors.newPass = "Password must be at least 8 characters";
  if (!form.confirm.trim()) errors.confirm = "Please confirm your password";
  else if (form.newPass !== form.confirm) errors.confirm = "Passwords do not match";
  return errors;
}

export default function Settings() {
  const { changePassword } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleUpdatePassword() {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors below.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = changePassword(form.current, form.newPass);
      if (result.success) {
        toast.success(result.message);
        setForm({ current: "", newPass: "", confirm: "" });
        setErrors({});
      } else {
        toast.error(result.message);
      }
      setLoading(false);
    }, 600);
  }

  const inputClass = (field) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-cream placeholder-cream/30 outline-none focus:ring-2 transition-all duration-200 ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-400/20"
        : "border-white/10 focus:border-primary focus:ring-primary/20"
    }`;

  return (
    <div className="space-y-8 animate-fade-in">
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
            <input type="password" name="current" value={form.current} onChange={handleChange} placeholder="Enter current password" className={inputClass("current")} />
            {errors.current && <p className="text-red-500 text-xs mt-1">{errors.current}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">New Password</label>
            <input type="password" name="newPass" value={form.newPass} onChange={handleChange} placeholder="Enter new password" className={inputClass("newPass")} />
            {errors.newPass && <p className="text-red-500 text-xs mt-1">{errors.newPass}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Confirm Password</label>
            <input type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Confirm new password" className={inputClass("confirm")} />
            {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
          </div>
          <LoadingButton
            onClick={handleUpdatePassword}
            loading={loading}
            loadingText="Updating..."
            className="bg-primary text-dark font-semibold px-6 py-3 rounded-xl text-sm hover:scale-105"
          >
            <FaSave className="text-xs" /> Update Password
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
