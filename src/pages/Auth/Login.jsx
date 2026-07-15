import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { users } from "../../data/users";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../components/ui/Toast";
import LoadingButton from "../../components/ui/LoadingButton";
import { FormError, inputClass } from "../../components/ui/FormError";
import bg from "../../assets/images/20649dbddd231856b87218213414f117ce56dc46.jpg";
import logo from "../../assets/logo/8bde5eb281dd3d316ed5b7cd4b93d99efeee103b (1).png";

function validate(form) {
  const errors = {};
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email address";
  if (!form.password.trim()) errors.password = "Password is required";
  return errors;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });

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
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        toast.error("Wrong email or password.");
        setLoading(false);
        return;
      }

      login(user);
      toast.success("Login successful! Welcome back.");
      setTimeout(() => navigate("/"), 400);
    }, 800);
  }

  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-lg border border-white/20 shadow-2xl grid lg:grid-cols-2">
        {/* Left Side - Branding (Desktop only) */}
        <div className="hidden lg:flex flex-col justify-center p-10 xl:p-14 text-white">
          <img src={logo} className="w-24 xl:w-28 mb-6 xl:mb-8" />
          <h1 className="font-heading text-4xl xl:text-5xl text-primary mb-4 xl:mb-5">Egypt Alive</h1>
          <p className="leading-7 xl:leading-8 text-white/80 text-sm xl:text-base">
            Experience timeless luxury travel through Egypt's magnificent history, breathtaking landscapes and unforgettable adventures.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-primary transition text-sm mb-6 sm:mb-8">
            <FaArrowLeft /> Back to Home
          </Link>

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6 sm:mb-8">
            <img src={logo} className="w-16 sm:w-20" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-primary mb-2">Welcome Back</h2>
          <p className="text-white/70 text-sm sm:text-base mb-6 sm:mb-8">Login to continue your journey</p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="text-white text-sm mb-1.5 block">Email</label>
              <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4">
                <FaEnvelope className="text-primary text-sm" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent py-3 sm:py-3.5 px-3 outline-none text-white text-sm placeholder:text-white/50"
                />
              </div>
              <FormError message={errors.email} />
            </div>

            <div>
              <label className="text-white text-sm mb-1.5 block">Password</label>
              <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4">
                <FaLock className="text-primary text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="flex-1 bg-transparent py-3 sm:py-3.5 px-3 outline-none text-white text-sm placeholder:text-white/50"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-1">
                  {showPassword ? <FaEyeSlash className="text-white/60 text-sm" /> : <FaEye className="text-white/60 text-sm" />}
                </button>
              </div>
              <FormError message={errors.password} />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
              <label className="flex items-center gap-2 text-white/80">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <button type="button" className="text-primary hover:underline text-left sm:text-right">Forgot Password?</button>
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingText="Logging in..."
              className="w-full bg-primary text-black py-3 sm:py-3.5 rounded-xl font-semibold hover:scale-[1.02] text-sm sm:text-base"
            >
              Login
            </LoadingButton>
          </form>

          <div className="flex items-center gap-3 my-5 sm:my-7">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/50 text-xs sm:text-sm">OR</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <button
            type="button"
            className="w-full bg-white text-black rounded-xl py-3 sm:py-3.5 flex justify-center items-center gap-3 hover:bg-gray-100 transition text-sm sm:text-base"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>

          <p className="text-center mt-6 sm:mt-8 text-white/80 text-sm">
            Don't have an account?
            <Link to="/register" className="text-primary font-semibold ml-2">Register</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
