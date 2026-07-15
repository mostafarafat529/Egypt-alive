import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "./AuthLayout";

export default function Register() {

  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {

    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

register({
    id: Date.now(),
    name: form.name,
    email: form.email,
    password: form.password,
    role: "user",
});

    navigate("/");
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Egypt Alive and start your next adventure."
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-xl p-4 outline-none text-white placeholder:text-white/50"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-xl p-4 outline-none text-white placeholder:text-white/50"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-xl p-4 outline-none text-white placeholder:text-white/50"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-xl p-4 outline-none text-white placeholder:text-white/50"
          required
        />

        <button
          className="w-full bg-primary text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          Create Account
        </button>

      </form>

      <div className="flex items-center gap-3 my-7">
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="text-white/50">OR</span>
        <div className="flex-1 h-px bg-white/20"></div>
      </div>

      <button
        className="w-full bg-white rounded-xl text-dark py-4 flex justify-center items-center gap-3 hover:bg-gray-100 transition"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      <p className="text-center mt-8 text-white/80">
        Already have an account?

        <Link
          to="/login"
          className="text-primary font-semibold ml-2"
        >
          Login
        </Link>

      </p>

    </AuthLayout>
  );
}