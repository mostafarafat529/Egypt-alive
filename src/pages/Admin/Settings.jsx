import { useState, useRef } from "react";
import { FaSave, FaBuilding } from "react-icons/fa";
import { useToast } from "../../components/ui/Toast";
import { FormError, inputClassDark } from "../../components/ui/FormError";

const SETTINGS_KEY = "ea_admin_settings";
const defaults = { siteName: "Egypt Alive", siteEmail: "info@egyptalive.com", siteUrl: "https://egyptalive.com" };

function loadSettings() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return defaults;
}

function validate(settings) {
  const errors = {};
  if (!settings.siteName.trim()) errors.siteName = "Site name is required";
  else if (settings.siteName.trim().length < 2) errors.siteName = "Site name must be at least 2 characters";
  if (!settings.siteEmail.trim()) errors.siteEmail = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.siteEmail.trim())) errors.siteEmail = "Invalid email address";
  if (settings.siteUrl.trim() && !/^https?:\/\/.+/.test(settings.siteUrl.trim())) errors.siteUrl = "URL must start with http:// or https://";
  return errors;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(loadSettings);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  const siteNameRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSave() {
    const validationErrors = validate(settings);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors below.");
      siteNameRef.current?.focus();
      return;
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    toast.success("Settings updated successfully.");
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl text-primary mb-2">Admin Settings</h1>
        <p className="text-cream/60">Configure platform settings and preferences.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FaBuilding className="text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-lg text-cream">General Settings</h2>
            <p className="text-cream/40 text-sm">Basic site configuration</p>
          </div>
        </div>
        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Site Name *</label>
            <input
              ref={siteNameRef}
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className={inputClassDark("siteName", errors)}
            />
            <FormError message={errors.siteName} />
          </div>
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Contact Email *</label>
            <input
              type="email"
              name="siteEmail"
              value={settings.siteEmail}
              onChange={handleChange}
              className={inputClassDark("siteEmail", errors)}
            />
            <FormError message={errors.siteEmail} />
          </div>
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Site URL</label>
            <input
              type="url"
              name="siteUrl"
              value={settings.siteUrl}
              onChange={handleChange}
              className={inputClassDark("siteUrl", errors)}
            />
            <FormError message={errors.siteUrl} />
          </div>
          <button
            onClick={handleSave}
            className="bg-primary text-dark font-semibold px-6 py-3 rounded-xl text-sm hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <FaSave className="text-xs" />
            Update Settings
          </button>
        </div>
      </div>
    </div>
  );
}
