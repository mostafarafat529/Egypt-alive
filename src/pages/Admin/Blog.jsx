import { useState } from "react";
import { useData } from "../../context/DataContext";
import FormModal from "../../components/ui/FormModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import ToastContainer, { useToast } from "../../components/ui/Toast";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaCalendar, FaTag } from "react-icons/fa";

const emptyForm = { title: "", category: "", description: "", image: "", date: "" };

export default function AdminBlog() {
  const { blogs, updateBlogs } = useData();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  const filtered = blogs.filter(
    (a) =>
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.category?.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(article) {
    setEditing(article);
    setForm({ title: article.title, category: article.category || "", description: article.description || "", image: article.image || "", date: article.date || "" });
    setShowForm(true);
  }

  function handleSave() {
    if (!form.title.trim() || !form.category.trim()) {
      addToast("Please fill in title and category.", "error");
      return;
    }
    if (editing) {
      updateBlogs((prev) => prev.map((a) => a.id === editing.id ? { ...a, ...form } : a));
      addToast("Article updated successfully.");
    } else {
      const newArticle = { id: Date.now(), ...form };
      updateBlogs((prev) => [...prev, newArticle]);
      addToast("Article created successfully.");
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  }

  function handleDelete() {
    if (deleteTarget) {
      updateBlogs((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      addToast("Article deleted.");
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
          <h1 className="font-heading text-3xl text-primary mb-2">Manage Blog</h1>
          <p className="text-cream/60">Create and manage blog articles.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-dark font-semibold px-5 py-3 rounded-xl text-sm hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/20"
        >
          <FaPlus className="text-xs" />
          Add Article
        </button>
      </div>

      <div className="relative max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-dark text-sm placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((article) => (
          <div key={article.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="h-44 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center gap-1 text-xs text-primary font-medium">
                  <FaTag className="text-[10px]" />
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <FaCalendar className="text-[10px]" />
                  {article.date}
                </span>
              </div>
              <h3 className="font-heading text-base text-dark mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{article.description}</p>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => openEdit(article)}
                  className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition"
                >
                  <FaEdit className="text-xs" />
                </button>
                <button
                  onClick={() => setDeleteTarget(article)}
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
          No articles found.
        </div>
      )}

      <FormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null); }}
        title={editing ? "Edit Article" : "Add New Article"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="Article title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary transition bg-white">
                <option value="">Select category</option>
                <option value="History">History</option>
                <option value="Adventure">Adventure</option>
                <option value="Luxury">Luxury</option>
                <option value="Travel Tips">Travel Tips</option>
                <option value="Culture">Culture</option>
                <option value="Guide">Guide</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input name="date" value={form.date} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="e.g. July 2026" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none" placeholder="Write a brief description..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="https://..." />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition">Cancel</button>
            <button onClick={handleSave} className="px-6 py-3 rounded-xl bg-primary text-dark text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/20">
              {editing ? "Save Changes" : "Create Article"}
            </button>
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Article"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
