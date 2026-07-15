import { useState } from "react";
import { useData } from "../../context/DataContext";
import FormModal from "../../components/ui/FormModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import ToastContainer, { useToast } from "../../components/ui/Toast";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaClock, FaUsers } from "react-icons/fa";

const emptyForm = { title: "", subtitle: "", image: "", duration: "", people: "", price: "" };

export default function AdminTours() {
  const { tours, updateTours } = useData();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  const filtered = tours.filter((t) =>
    t.title?.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(tour) {
    setEditing(tour);
    setForm({ title: tour.title, subtitle: tour.subtitle || "", image: tour.image || "", duration: tour.duration, people: tour.people, price: tour.price });
    setShowForm(true);
  }

  function handleSave() {
    if (!form.title.trim() || !form.duration.trim() || !form.price.trim()) {
      addToast("Please fill in title, duration, and price.", "error");
      return;
    }
    if (editing) {
      updateTours((prev) => prev.map((t) => t.id === editing.id ? { ...t, ...form } : t));
      addToast("Tour updated successfully.");
    } else {
      const newTour = { id: Date.now(), ...form, rating: 4.5, reviewCount: 0 };
      updateTours((prev) => [...prev, newTour]);
      addToast("Tour created successfully.");
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  }

  function handleDelete() {
    if (deleteTarget) {
      updateTours((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      addToast("Tour deleted.");
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
          <h1 className="font-heading text-3xl text-primary mb-2">Manage Tours</h1>
          <p className="text-cream/60">Create, edit, and manage tour packages.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-dark font-semibold px-5 py-3 rounded-xl text-sm hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/20"
        >
          <FaPlus className="text-xs" />
          Add Tour
        </button>
      </div>

      <div className="relative max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search tours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-dark text-sm placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tour) => (
          <div key={tour.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="h-48 overflow-hidden">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg text-dark mb-2">{tour.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <FaClock className="text-xs text-primary" />
                  {tour.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FaUsers className="text-xs text-primary" />
                  {tour.people}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-heading text-xl text-primary">{tour.price}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(tour)}
                    className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition"
                  >
                    <FaEdit className="text-xs" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(tour)}
                    className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
          No tours found.
        </div>
      )}

      <FormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null); }}
        title={editing ? "Edit Tour" : "Add New Tour"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="e.g. Classic Cairo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input name="subtitle" value={form.subtitle} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="e.g. Pyramids, Museums & Bazaars" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="https://..." />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
              <input name="duration" value={form.duration} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="3 Days" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">People</label>
              <input name="people" value={form.people} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="2-8" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input name="price" value={form.price} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="$420" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition">Cancel</button>
            <button onClick={handleSave} className="px-6 py-3 rounded-xl bg-primary text-dark text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/20">
              {editing ? "Save Changes" : "Create Tour"}
            </button>
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Tour"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
