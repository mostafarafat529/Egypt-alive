import { useParams, Link } from "react-router-dom";
import { destinationDetails } from "../../data/destinationDetails";
import { useData } from "../../context/DataContext";
import Gallery from "../../components/common/Gallery";
import Highlights from "../../components/common/Highlights";
import TravelTips from "../../components/common/TravelTips";
import FactCard from "../../components/common/FactCard";
import RelatedPosts from "../../components/common/RelatedPosts";
import BackButton from "../../components/common/BackButton";
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

export default function DestinationDetails() {
  const { id } = useParams();
  const { tours } = useData();
  const dest = destinationDetails.find((d) => d.id === Number(id));

  if (!dest) {
    return (
      <div className="bg-[#F8F5EF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-dark mb-4">Destination Not Found</h1>
          <Link to="/destinations" className="text-primary font-semibold hover:underline">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  const relatedTours = tours.slice(0, 3).map((t) => ({
    id: t.id,
    title: t.title,
    image: t.image,
    price: t.price,
  }));

  const quickFacts = [
    { label: "Population", value: dest.quickFacts.population },
    { label: "Language", value: dest.quickFacts.language },
    { label: "Currency", value: dest.quickFacts.currency },
    { label: "Timezone", value: dest.quickFacts.timezone },
    { label: "Area", value: dest.quickFacts.area },
    { label: "Calling Code", value: dest.quickFacts.callingCode },
  ];

  return (
    <div className="bg-[#F8F5EF] min-h-screen">

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <img
          src={dest.heroImage}
          alt={dest.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <BackButton label="Back to Destinations" />
            <div className="flex items-center gap-2 text-primary text-sm mb-2">
              <FaMapMarkerAlt />
              <span className="uppercase tracking-[3px]">{dest.subtitle}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl text-white">
              {dest.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-8 text-lg">{dest.description}</p>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="font-heading text-3xl text-dark mb-6">Gallery</h2>
              <Gallery images={dest.gallery} />
            </div>

            {/* Popular Attractions */}
            <Highlights items={dest.attractions} title="Popular Attractions" />

            {/* Things To Do */}
            <div>
              <h3 className="font-heading text-2xl text-dark mb-5">Things To Do</h3>
              <div className="space-y-3">
                {dest.thingsToDo.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaArrowRight className="text-primary mt-1.5 text-sm flex-shrink-0" />
                    <span className="text-gray-600 leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Time To Visit */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <FaCalendarAlt className="text-primary" />
                <h3 className="font-heading text-xl text-dark">Best Time To Visit</h3>
              </div>
              <p className="text-gray-600 leading-7">{dest.bestTime}</p>
            </div>

            {/* Travel Tips */}
            <TravelTips tips={dest.travelTips} />

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-heading text-xl text-dark mb-4">Quick Facts</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickFacts.map((fact, i) => (
                  <FactCard key={i} label={fact.label} value={fact.value} />
                ))}
              </div>
            </div>

            <Link
              to="/tour-packages"
              className="block bg-primary text-dark text-center py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Explore Available Tours
            </Link>
          </div>

        </div>
      </section>

      {/* Related Tours */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <RelatedPosts posts={relatedTours} type="tours" />
      </section>

    </div>
  );
}
