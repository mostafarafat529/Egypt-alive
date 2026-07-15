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
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-lg grid lg:grid-cols-2">

        {/* Left Side - Branding (Desktop only) */}
        <div className="hidden lg:flex flex-col justify-center p-10 xl:p-14 text-white bg-black/20">
          <img
            src={logo}
            alt=""
            className="w-24 xl:w-28 mb-6 xl:mb-8"
          />
          <h1 className="font-heading text-4xl xl:text-5xl text-primary mb-4 xl:mb-6">
            Egypt Alive
          </h1>
          <p className="leading-7 xl:leading-8 text-white/80 text-sm xl:text-base">
            Experience timeless luxury travel through Egypt's magnificent
            history, breathtaking landscapes and unforgettable adventures.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-10">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-primary transition text-sm mb-6 sm:mb-8"
          >
            <FaArrowLeft />
            Back to Home
          </Link>

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6 sm:mb-8">
            <img
              src={logo}
              alt=""
              className="w-16 sm:w-20"
            />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-primary mb-2">
            {title}
          </h2>

          <p className="text-white/70 text-sm sm:text-base mb-6 sm:mb-8">
            {subtitle}
          </p>

          {children}

        </div>

      </div>
    </section>
  );
}
