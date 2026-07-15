import { useState, useEffect } from "react";
import { messageService } from "../../services/messageService";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { useToast } from "../../components/ui/Toast";
import { FaSearch } from "react-icons/fa";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    setMessages(messageService.getAll());
  }, []);

  function handleRead(id) {
    setMessages(messageService.markAsRead(id));
  }

  function handleDelete() {
    if (deleteTarget) {
      setMessages(messageService.remove(deleteTarget.id));
      toast.success("Message deleted.");
      setDeleteTarget(null);
    }
  }

  function handleView(msg) {
    setSelected(msg);
    if (msg.status === "New") handleRead(msg.id);
  }

  const filtered = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      label: "Name",
      key: "name",
      render: (row) => <span className="font-medium text-dark truncate block max-w-[120px]">{row.name}</span>,
    },
    { label: "Phone", key: "phone" },
    {
      label: "Email",
      render: (row) => <span className="truncate block max-w-[160px]">{row.email}</span>,
    },
    {
      label: "Subject",
      render: (row) => <span className="truncate block max-w-[140px]">{row.subject}</span>,
    },
    {
      label: "Status",
      render: (row) => <Badge status={row.status} />,
    },
    {
      label: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl text-primary mb-2">Messages</h1>
        <p className="text-cream/60">View and respond to customer messages.</p>
      </div>

      <div className="relative max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
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
              onClick={() => handleView(row)}
              className="text-xs bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg hover:bg-primary/20 transition"
            >
              View
            </button>
            {row.status === "New" && (
              <button
                onClick={() => { handleRead(row.id); toast.success("Marked as read."); }}
                className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition"
              >
                Read
              </button>
            )}
            <button
              onClick={() => setDeleteTarget(row)}
              className="text-xs bg-red-50 text-red-500 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition"
            >
              Delete
            </button>
          </>
        )}
      />

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Message Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">From</span>
                <p className="text-dark font-medium">{selected.name}</p>
              </div>
              <div>
                <span className="text-gray-400">Phone</span>
                <p className="text-dark font-medium">{selected.phone}</p>
              </div>
              <div>
                <span className="text-gray-400">Email</span>
                <p className="text-dark font-medium">{selected.email}</p>
              </div>
              <div>
                <span className="text-gray-400">Date</span>
                <p className="text-dark font-medium">{new Date(selected.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Subject</span>
              <p className="text-dark font-semibold">{selected.subject}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Message</span>
              <p className="text-dark leading-7 mt-1 bg-gray-50 rounded-lg p-4">{selected.message}</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Message"
        message={`Are you sure you want to delete the message from "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
