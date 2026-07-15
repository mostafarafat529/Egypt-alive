import { useState, useEffect } from "react";
import { bookingService } from "../../services/bookingService";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import ToastContainer, { useToast } from "../../components/ui/Toast";
import { FaSearch, FaFilter } from "react-icons/fa";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    setBookings(bookingService.getAll());
  }, []);

  function handleApprove(id) {
    setBookings(bookingService.updateStatus(id, "Confirmed"));
    addToast("Booking confirmed.");
  }

  function handleReject(id) {
    setBookings(bookingService.updateStatus(id, "Cancelled"));
    addToast("Booking cancelled.");
  }

  function handleDelete() {
    if (deleteTarget) {
      setBookings(bookingService.remove(deleteTarget.id));
      addToast("Booking deleted.");
      setDeleteTarget(null);
    }
  }

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.userName?.toLowerCase().includes(search.toLowerCase()) ||
      b.tourTitle?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      label: "Customer",
      render: (row) => (
        <div>
          <p className="font-medium text-dark">{row.userName}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      ),
    },
    { label: "Phone", key: "phone" },
    { label: "Tour", key: "tourTitle" },
    {
      label: "Travel Date",
      render: (row) => new Date(row.travelDate).toLocaleDateString(),
    },
    { label: "Guests", key: "guests" },
    {
      label: "Status",
      render: (row) => <Badge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-heading text-3xl text-primary mb-2">Manage Bookings</h1>
        <p className="text-cream/60">Track and manage all customer bookings.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name, tour, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-dark text-sm placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400 text-sm" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary transition-all duration-200"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        renderActions={(row) => (
          <>
            <button
              onClick={() => setSelected(row)}
              className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition"
            >
              View
            </button>
            {row.status === "Pending" && (
              <>
                <button
                  onClick={() => handleApprove(row.id)}
                  className="text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-100 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(row.id)}
                  className="text-xs bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-lg hover:bg-yellow-100 transition"
                >
                  Reject
                </button>
              </>
            )}
            <button
              onClick={() => setDeleteTarget(row)}
              className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
            >
              Delete
            </button>
          </>
        )}
      />

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Booking Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Customer</span>
                <p className="text-dark font-medium">{selected.userName}</p>
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
                <span className="text-gray-400">Tour</span>
                <p className="text-dark font-medium">{selected.tourTitle}</p>
              </div>
              <div>
                <span className="text-gray-400">Travel Date</span>
                <p className="text-dark font-medium">{new Date(selected.travelDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-400">Guests</span>
                <p className="text-dark font-medium">{selected.guests}</p>
              </div>
              <div>
                <span className="text-gray-400">Status</span>
                <Badge status={selected.status} />
              </div>
            </div>
            {selected.notes && (
              <div>
                <span className="text-gray-400 text-sm">Special Requests</span>
                <p className="text-dark leading-7 mt-1 bg-gray-50 rounded-lg p-4">{selected.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Booking"
        message={`Are you sure you want to delete the booking for "${deleteTarget?.userName}"? This action cannot be undone.`}
      />
    </div>
  );
}
