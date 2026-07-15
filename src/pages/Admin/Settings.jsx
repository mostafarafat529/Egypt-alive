import { useState } from "react";
import { FaSave, FaBuilding } from "react-icons/fa";
import ToastContainer, { useToast } from "../../components/ui/Toast";

const SETTINGS_KEY = "ea_admin_settings";
const defaults = { siteName: "Egypt Alive", siteEmail: "info@egyptalive.com", siteUrl: "https://egyptalive.com" };

function loadSettings() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return defaults;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(loadSettings);
  const { toasts, addToast, removeToast } = useToast();

  function handleChange(e) {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    if (!settings.siteName.trim() || !settings.siteEmail.trim()) {
      addToast("Site name and email are required.", "error");
      return;
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    addToast("Settings updated successfully.");
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
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
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Site Name</label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Contact Email</label>
            <input
              type="email"
              name="siteEmail"
              value={settings.siteEmail}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cream/70 mb-1.5">Site URL</label>
            <input
              type="url"
              name="siteUrl"
              value={settings.siteUrl}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
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
