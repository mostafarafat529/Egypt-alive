import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import bg from "../../assets/images/20649dbddd231856b87218213414f117ce56dc46.jpg";
import logo from "../../assets/logo/8bde5eb281dd3d316ed5b7cd4b93d99efeee103b (1).png";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
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

      <div className="relative z-10 w-full max-w-6xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-lg grid lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center p-14 text-white bg-black/20">

          <img
            src={logo}
            alt=""
            className="w-28 mb-8"
          />

          <h1 className="font-heading text-5xl text-primary mb-6">
            Egypt Alive
          </h1>

          <p className="leading-8 text-white/80">
            Experience timeless luxury travel through Egypt's magnificent
            history, breathtaking landscapes and unforgettable adventures.
          </p>

        </div>

        {/* Right Side */}

        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-10">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white hover:text-primary transition mb-8"
          >
            <FaArrowLeft />
            Back to Home
          </Link>

          {/* Mobile Logo */}

          <div className="lg:hidden flex justify-center mb-8">

            <img
              src={logo}
              alt=""
              className="w-24"
            />

          </div>

          <h2 className="font-heading text-4xl text-primary mb-2">
            {title}
          </h2>

          <p className="text-white/70 mb-8">
            {subtitle}
          </p>

          {children}

        </div>

      </div>
    </section>
  );
}