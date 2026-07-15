import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../components/ui/Toast";
import LoadingButton from "../../components/ui/LoadingButton";
import { FormError } from "../../components/ui/FormError";
import AuthLayout from "./AuthLayout";

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 3) errors.name = "Name must be at least 3 characters";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email address";
  if (!form.password.trim()) errors.password = "Password is required";
  else if (form.password.length < 8) errors.password = "Password must be at least 8 characters";
  if (!form.confirmPassword.trim()) errors.confirmPassword = "Please confirm your password";
  else if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
  return errors;
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors below.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      register({
        id: Date.now(),
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user",
      });
      toast.success("Account created successfully! Welcome aboard.");
      setTimeout(() => navigate("/"), 400);
    }, 800);
  }

  const inputClass = (field) =>
    `w-full bg-white/10 border rounded-xl p-4 outline-none text-white placeholder:text-white/50 transition ${
      errors[field] ? "border-red-400 focus:border-red-500" : "border-white/20 focus:border-primary"
    }`;

  return (
    <AuthLayout title="Create Account" subtitle="Join Egypt Alive and start your next adventure.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={inputClass("name")}
          />
          <FormError message={errors.name} />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className={inputClass("email")}
          />
          <FormError message={errors.email} />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 characters)"
            value={form.password}
            onChange={handleChange}
            className={inputClass("password")}
          />
          <FormError message={errors.password} />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={inputClass("confirmPassword")}
          />
          <FormError message={errors.confirmPassword} />
        </div>

        <LoadingButton
          type="submit"
          loading={loading}
          loadingText="Creating Account..."
          className="w-full bg-primary text-black py-4 rounded-xl font-semibold hover:scale-[1.02]"
        >
          Create Account
        </LoadingButton>
      </form>

      <div className="flex items-center gap-3 my-7">
        <div className="flex-1 h-px bg-white/20" />
        <span className="text-white/50">OR</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      <button className="w-full bg-white rounded-xl text-dark py-4 flex justify-center items-center gap-3 hover:bg-gray-100 transition">
        <FcGoogle size={24} /> Continue with Google
      </button>

      <p className="text-center mt-8 text-white/80">
        Already have an account?
        <Link to="/login" className="text-primary font-semibold ml-2">Login</Link>
      </p>
    </AuthLayout>
  );
}
