import DisCard from "./DisCard";
import { useData } from "../../context/DataContext";
import img1 from "../../assets/images/0f88316d45c0f836314b228a8344401d66ba8179.jpg";

export default function Destinations() {
  const { destinations } = useData();

  return (
    <div className="bg-[#F8F5EF]">

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">

        <div className="pt-20">

          <span className="text-primary text-xs tracking-[0.2em] uppercase ">
            The Eternal Journey
          </span>

          <h1 className="font-heading text-4xl md:text-5xl text-dark mt-3 max-w-xl leading-tight">
            Sacred Sites & Modern Marvels
          </h1>

          <p className="text-gray-600 max-w-lg mt-5 leading-8">
            From the shadowed mysteries of the pyramids to the crystalline
            shores of the Red Sea, explore the diverse landscapes that have
            shaped five millennia of human history.
          </p>

        </div>

        <div className="hidden md:flex items-center gap-3 text-gray-500 text-xs tracking-[0.2em] uppercase whitespace-nowrap">

          Scroll to discover

          <span className="w-10 h-px bg-gray-400" />

        </div>

      </section>

      {/* Destinations */}

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">

        <div className="grid md:grid-cols-2 gap-4">

          {destinations.map((dest) => (

            <div key={dest.id} className="h-[400px]">

              <DisCard {...dest} />

            </div>

          ))}

        </div>

      </section>

      {/* Newsletter */}

      <section className="bg-white border-t border-primary/10">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-14 items-center">

          <div>

            <span className="text-primary text-xs tracking-[0.2em] uppercase">
              Legacy Chronicles
            </span>

            <h2 className="font-heading text-3xl md:text-4xl text-dark mt-3 leading-snug">
              Uncover the Hidden Gems of the Pharaohs
            </h2>

            <p className="text-gray-600 mt-5 max-w-md leading-8">
              Join our Heritage Foundation and receive exclusive invitations
              to private viewings of ongoing excavations and newly restored
              archaeological sites across the Nile Delta.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-4 mt-8 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >

              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-dark placeholder:text-gray-400 focus:outline-none focus:border-primary"
                required
              />

              <button
                type="submit"
                className="bg-primary text-dark font-semibold px-8 rounded-full hover:bg-primary-light transition"
              >
                Join
              </button>

            </form>

          </div>

          <div className="rounded-xl overflow-hidden shadow-xl">

            <img
              src={img1}
              alt="Ancient Egypt"
              className="w-full h-[450px] object-cover"
            />

          </div>

        </div>

      </section>

    </div>
  );
}
