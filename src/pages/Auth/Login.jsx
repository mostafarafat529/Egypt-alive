import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaLock, FaEye, FaEyeSlash} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { users } from "../../data/users";
import { useAuth } from "../../hooks/useAuth";

import bg from "../../assets/images/20649dbddd231856b87218213414f117ce56dc46.jpg";
import logo from "../../assets/logo/8bde5eb281dd3d316ed5b7cd4b93d99efeee103b (1).png";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }


  
function handleSubmit(e) {
  e.preventDefault();

  const user = users.find(
    (u) =>
      u.email === formData.email &&
      u.password === formData.password
  );

  if (!user) {
    alert("Wrong Email Or Password");
    return;
  }

  login(user);

  navigate("/");
}
  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-5 py-10"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/70"></div>

      {/* Card */}

      <div className="relative z-10 w-full max-w-6xl rounded-3xl overflow-hidden backdrop-blur-lg border border-white/20 shadow-2xl grid lg:grid-cols-2">

        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center p-14 text-white">

          <img
            src={logo}
            className="w-28 mb-8"
          />

          <h1 className="font-heading text-5xl text-primary mb-5">
            Egypt Alive
          </h1>

          <p className="leading-8 text-white/80">
            Experience timeless luxury travel through Egypt's magnificent
            history, breathtaking landscapes and unforgettable adventures.
          </p>

        </div>

        {/* Right */}

        <div className="bg-white/10 backdrop-blur-xl p-10">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white hover:text-primary transition mb-8"
          >
            <FaArrowLeft />
            Back to Home
          </Link>

          <div className="lg:hidden flex justify-center mb-8">

            <img
              src={logo}
              className="w-20"
            />

          </div>

          <h2 className="font-heading text-4xl text-primary mb-2">
            Welcome Back
          </h2>

          <p className="text-white/70 mb-8">
            Login to continue your journey
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Email */}

            <div>

              <label className="text-white text-sm mb-2 block">
                Email
              </label>

              <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                <FaEnvelope className="text-primary" />

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent p-4 outline-none text-white placeholder:text-white/50"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="text-white text-sm mb-2 block">
                Password
              </label>

              <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">

                <FaLock className="text-primary" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="flex-1 bg-transparent p-4 outline-none text-white placeholder:text-white/50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-white/60" />
                  ) : (
                    <FaEye className="text-white/60" />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2 text-white/80">

                <input type="checkbox" />

                Remember me

              </label>

              <button
                type="button"
                className="text-primary hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <button
              className="w-full bg-primary text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Login
            </button>

          </form>

          {/* Divider */}

          <div className="flex items-center gap-3 my-7">

            <div className="flex-1 h-px bg-white/20"></div>

            <span className="text-white/50">
              OR
            </span>

            <div className="flex-1 h-px bg-white/20"></div>

          </div>

          <button
            type="button"
            className="w-full bg-white text-black rounded-xl py-4 flex justify-center items-center gap-3 hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />

            Continue with Google

          </button>

          <p className="text-center mt-8 text-white/80">

            Don't have an account?

            <Link
              to="/register"
              className="text-primary font-semibold ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>
    </section>
  );
}