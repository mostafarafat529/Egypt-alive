import { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import DataTable from "../../components/ui/DataTable";
import FormModal from "../../components/ui/FormModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import ToastContainer, { useToast } from "../../components/ui/Toast";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const roleStyles = {
  admin: "bg-primary/10 text-primary",
  user: "bg-blue-50 text-blue-600",
};

const emptyForm = { name: "", email: "", password: "", role: "user" };

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    setUsers(userService.getAll());
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(user) {
    setEditing(user);
    setForm({ name: user.name, email: user.email, password: user.password || "", role: user.role });
    setShowForm(true);
  }

  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) {
      addToast("Please fill in name and email.", "error");
      return;
    }
    if (!editing && !form.password.trim()) {
      addToast("Password is required for new users.", "error");
      return;
    }
    if (editing) {
      setUsers(userService.update(editing.id, form));
      addToast("User updated successfully.");
    } else {
      setUsers(userService.create(form));
      addToast("User created successfully.");
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  }

  function handleDelete() {
    if (deleteTarget) {
      setUsers(userService.remove(deleteTarget.id));
      addToast("User deleted.");
      setDeleteTarget(null);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const columns = [
    {
      label: "User",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            {row.name?.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-dark">{row.name}</p>
            <p className="text-xs text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      label: "Role",
      render: (row) => (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${roleStyles[row.role] || "bg-gray-100 text-gray-600"}`}>
          {row.role}
        </span>
      ),
    },
    {
      label: "ID",
      render: (row) => <span className="text-gray-500">#{row.id}</span>,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl text-primary mb-2">Manage Users</h1>
          <p className="text-cream/60">View and manage registered users.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-dark font-semibold px-5 py-3 rounded-xl text-sm hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/20"
        >
          <FaPlus className="text-xs" />
          Add User
        </button>
      </div>

      <div className="relative max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-dark text-sm placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        renderActions={(row) => (
          <>
            <button
              onClick={() => openEdit(row)}
              className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition"
            >
              <FaEdit className="inline mr-1" />
              Edit
            </button>
            <button
              onClick={() => setDeleteTarget(row)}
              className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
            >
              <FaTrash className="inline mr-1" />
              Delete
            </button>
          </>
        )}
      />

      <FormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null); }}
        title={editing ? "Edit User" : "Add New User"}
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="user@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{editing ? "New Password (leave blank to keep)" : "Password *"}</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition" placeholder="********" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select name="role" value={form.role} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary transition bg-white">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition">Cancel</button>
            <button onClick={handleSave} className="px-6 py-3 rounded-xl bg-primary text-dark text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/20">
              {editing ? "Save Changes" : "Create User"}
            </button>
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.name}" (${deleteTarget?.email})? This action cannot be undone.`}
      />
    </div>
  );
}
