import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { useData } from "../../context/DataContext";
import { bookingService } from "../../services/bookingService.js";
import { useToast } from "../../components/ui/Toast";
import LoadingButton from "../../components/ui/LoadingButton";
import { FormError, inputClass } from "../../components/ui/FormError";

const initialForm = { name: "", email: "", phone: "", travelDate: "", guests: "1", notes: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 3) errors.name = "Name must be at least 3 characters";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email address";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  else if (!/^[\d+\s()-]{7,}$/.test(form.phone)) errors.phone = "Invalid phone number";
  if (!form.travelDate) errors.travelDate = "Travel date is required";
  if (!form.guests || Number(form.guests) < 1) errors.guests = "At least 1 guest";
  return errors;
}

export default function Booking() {
  const { tourId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tours } = useData();
  const tour = tours.find((p) => p.id === Number(tourId));

  const [formData, setFormData] = useState({
    ...initialForm,
    name: user?.name || "",
    email: user?.email || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors below.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      bookingService.create({
        tourId: Number(tourId),
        tourTitle: tour?.title || "Unknown Tour",
        userName: formData.name,
        email: formData.email,
        phone: formData.phone,
        travelDate: formData.travelDate,
        guests: Number(formData.guests),
        notes: formData.notes,
      });
      toast.success("Booking submitted successfully! We'll confirm your trip shortly.");
      setLoading(false);
      setTimeout(() => navigate("/dashboard/bookings"), 1000);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl text-dark mb-2">Complete Your Booking</h1>
        <p className="text-gray-600 mb-8">
          {tour ? `Booking: ${tour.title} — ${tour.duration} — ${tour.price}` : "Tour not found"}
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-dark mb-2">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass("name", errors)} placeholder="Your full name" />
            <FormError message={errors.name} />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass("email", errors)} placeholder="Your email" />
              <FormError message={errors.email} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass("phone", errors)} placeholder="Phone number" />
              <FormError message={errors.phone} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Travel Date</label>
              <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className={inputClass("travelDate", errors)} />
              <FormError message={errors.travelDate} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Number of Guests</label>
              <input type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} className={inputClass("guests", errors)} />
              <FormError message={errors.guests} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-2">Special Requests</label>
            <textarea
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-5 py-4 text-black placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all duration-200"
              placeholder="Any special requirements..."
            />
          </div>

          <LoadingButton
            type="submit"
            loading={loading}
            loadingText="Booking..."
            className="w-full bg-primary text-dark font-semibold py-4 rounded-xl hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
          >
            Confirm Booking
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
