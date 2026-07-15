import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/images/20649dbddd231856b87218213414f117ce56dc46.jpg";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen">
      {/* Background */}
      <img
        src={heroImage}
        alt="Egypt"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/50"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="font-heading text-4xl mt-20 pt-20 md:text-5xl text-white font-bold max-w-4xl leading-tight">
          Walk Through 7,000 Years of Grandeur.
        </h1>

        <p className="mt-6 text-cream/80 max-w-2xl leading-8">
          Experience the eternal cradle of civilization with bespoke journeys
          designed for the modern connoisseur of history.
        </p>

        <button
          onClick={() => navigate("/destinations")}
          className="mt-8 bg-primary text-dark px-8 py-3 rounded-full font-semibold hover:scale-105 transition duration-300"
        >
          Start Your Journey
        </button>

        <HeroSearch />
      </div>
    </section>
  );
}