import { FaClock, FaUsers, FaStar } from "react-icons/fa";
import { useData } from "../../context/DataContext";
import TourCard from "./TourCard";

import img2 from "../../assets/images/70c8579ca686b12f4ceb2ae39287277a31cb1d26.png";


export default function TourPackages() {
  const { tours } = useData();

  return (
    <div className="bg-[#F8F5EF] min-h-screen">
      {/* Hero */}
      <section className="h-[70vh] relative flex items-center justify-center pt-20">
        <img
          src={img2}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative z-10 text-center px-5">
          <p className="uppercase tracking-[4px] text-primary mb-4">
            Luxury Tours
          </p>
          <h1 className="font-heading text-5xl md:text-6xl text-white">
            Tour Packages
          </h1>
          <p className="text-white/80 mt-5 max-w-2xl mx-auto leading-relaxed">
            Explore Egypt through carefully curated luxury journeys combining
            history, culture and unforgettable experiences. From the Pyramids
            of Giza to the crystal waters of the Red Sea.
          </p>
        </div>
      </section>

      {/* Tours */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[3px] text-primary">
            Our Collection
          </p>

          <h2 className="font-heading text-4xl text-dark mt-3">
            Featured Tours
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Each journey is crafted with care — led by expert Egyptologists,
            staying at handpicked accommodations, and designed to create memories
            that last a lifetime.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              {...tour}
            />
          ))}

        </div>

      </section>

      {/* Why Us */}
      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">

          <div className="p-6">

            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <FaStar className="text-primary text-2xl"/>
            </div>

            <h3 className="font-heading text-2xl mb-3 text-gray-900">
              Premium Service
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Luxury accommodation, private transfers, and world-class hospitality
              at every step of your journey.
            </p>

          </div>

          <div className="p-6">

            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <FaStar className="text-primary text-2xl"/>
            </div>

            <h3 className="font-heading text-2xl mb-3 text-gray-900">
              Expert Guides
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Licensed Egyptologists accompany every journey, bringing ancient
              history to life with stories and insights.
            </p>

          </div>

          <div className="p-6">

            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <FaStar className="text-primary text-2xl"/>
            </div>

            <h3 className="font-heading text-2xl mb-3 text-gray-900">
              Best Experience
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Carefully designed itineraries balanced between guided exploration
              and free time for personal discovery.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24 text-center px-6">

        <h2 className="font-heading text-4xl text-dark mb-5">
          Ready For Your Journey?
        </h2>

        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Discover the wonders of Egypt with our exclusive travel packages.
          Every tour is fully customizable to match your interests and pace.
        </p>

        <button className="bg-primary text-dark px-10 py-4 rounded-full font-semibold hover:scale-105 transition">
          Book Your Tour
        </button>

      </section>

    </div>
  );
}
