import { useState } from "react";
import { useData } from "../../context/DataContext";
import FormModal from "../../components/ui/FormModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import ToastContainer, { useToast } from "../../components/ui/Toast";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaMapMarkerAlt } from "react-icons/fa";

const emptyForm = { title: "", label: "", description: "", image: "", className: "h-[300px]" };

export default function AdminDestinations() {
  const { destinations, updateDestinations } = useData();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  const filtered = destinations.filter((d) =>
    d.title?.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(dest) {
    setEditing(dest);
    setForm({ title: dest.title, label: dest.label || "", description: dest.description || dest.quote || "", image: dest.image || "", className: dest.className || "h-[300px]" });
    setShowForm(true);
  }

  function handleSave() {
    if (!form.title.trim()) {
      addToast("Please enter a destination title.", "error");
      return;
    }
    if (editing) {
      updateDestinations((prev) => prev.map((d) => d.id === editing.id ? { ...d, ...form } : d));
      addToast("Destination updated successfully.");
    } else {
      const newDest = { id: Date.now(), ...form };
      updateDestinations((prev) => [...prev, newDest]);
      addToast("Destination created successfully.");
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  }

  function handleDelete() {
    if (deleteTarget) {
      updateDestinations((prev) => prev.filter((d) => d.id !== deleteTarget.id));
      addToast("Destination deleted.");
      setDeleteTarget(null);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl text-primary mb-2">Manage Destinations</h1>
          <p className="text-cream/60">Add, edit, and organize travel destinations.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-dark font-semibold px-5 py-3 rounded-xl text-sm hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/20"
        >
          <FaPlus className="text-xs" />
          Add Destination
        </button>
      </div>

      <div className="relative max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-dark text-sm placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((dest) => (
          <div key={dest.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="h-48 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-primary text-sm" />
                <h3 className="font-heading text-lg text-dark">{dest.title}</h3>
              </div>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {dest.description || dest.quote || "No description available."}
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => openEdit(dest)}
                  className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition"
                >
                  <FaEdit className="text-xs" />
                </button>
                <button
                  onClick={() => setDeleteTarget(dest)}
                  className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
          No destinations found.
        </div>
      )}

      <FormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null); }}
        title={editing ? "Edit Destination" : "Add New Destination"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="e.g. Cairo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input name="label" value={form.label} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="e.g. Lower Egypt" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none" placeholder="Describe this destination..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="https://..." />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition">Cancel</button>
            <button onClick={handleSave} className="px-6 py-3 rounded-xl bg-primary text-dark text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/20">
              {editing ? "Save Changes" : "Create Destination"}
            </button>
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Destination"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
