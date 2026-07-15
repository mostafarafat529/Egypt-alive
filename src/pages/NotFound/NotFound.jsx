import { Link } from "react-router-dom";

import bg from "../../assets/images/20649dbddd231856b87218213414f117ce56dc46.jpg";
import logo from "../../assets/logo/8bde5eb281dd3d316ed5b7cd4b93d99efeee103b (1).png";


export default function NotFound() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content */}

      <div className="relative z-10 text-center max-w-xl">

        <img
          src={logo}
          alt="Egypt Alive"
          className="w-28 mx-auto mb-8"
        />

        <h1 className="font-heading text-8xl md:text-9xl text-primary">
          404
        </h1>

        <h2 className="font-heading text-4xl text-white mt-5">
          Page Not Found
        </h2>

        <p className="text-white/70 leading-8 mt-5">
          The page you're looking for doesn't exist or may have been moved.
          Let's guide you back to Egypt's unforgettable journeys.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

          <Link
            to="/"
            className="bg-primary text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
          >
            Back Home
          </Link>

          <Link
            to="/destinations"
            className="border border-primary text-primary px-8 py-4 rounded-full hover:bg-primary hover:text-black transition"
          >
            Explore Destinations
          </Link>

        </div>

      </div>
    </section>
  );
}