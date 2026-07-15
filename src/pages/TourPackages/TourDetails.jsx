import { useParams, Link } from "react-router-dom";
import { tourDetails } from "../../data/tourDetails";
import { useData } from "../../context/DataContext";
import Gallery from "../../components/common/Gallery";
import Highlights from "../../components/common/Highlights";
import StickyBookingCard from "../../components/common/StickyBookingCard";
import Timeline from "../../components/common/Timeline";
import ReviewCard from "../../components/common/ReviewCard";
import RelatedPosts from "../../components/common/RelatedPosts";
import BackButton from "../../components/common/BackButton";
import { FaMapMarkerAlt, FaStar, FaCheck, FaTimes } from "react-icons/fa";

export default function TourDetails() {
  const { id } = useParams();
  const { tours } = useData();
  const tour = tourDetails.find((t) => t.id === Number(id));

  if (!tour) {
    return (
      <div className="bg-[#F8F5EF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-dark mb-4">Tour Not Found</h1>
          <Link to="/tour-packages" className="text-primary font-semibold hover:underline">
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  const relatedTours = tour.relatedIds
    .map((rid) => tours.find((p) => p.id === rid))
    .filter(Boolean)
    .map((t) => ({ id: t.id, title: t.title, image: t.image, price: t.price }));

  return (
    <div className="bg-[#F8F5EF] min-h-screen">

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <img
          src={tour.image}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <BackButton label="Back to Tours" />
            <div className="flex items-center gap-2 text-primary text-sm mb-2">
              <FaMapMarkerAlt />
              <span className="uppercase tracking-[3px]">{tour.location}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl text-white mb-3">
              {tour.title}
            </h1>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <FaStar className="text-primary" />
                {tour.rating} ({tour.reviewCount} reviews)
              </span>
              <span>{tour.duration}</span>
              <span>{tour.people} people</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <div>
              <h2 className="font-heading text-3xl text-dark mb-4">Overview</h2>
              <p className="text-gray-600 leading-8 text-lg">{tour.overview}</p>
            </div>

            {/* Highlights */}
            <Highlights items={tour.highlights} />

            {/* Included / Not Included */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl text-dark mb-4">What&apos;s Included</h3>
                <ul className="space-y-2">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <FaCheck className="text-green-500 mt-1 text-xs flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-xl text-dark mb-4">What&apos;s Not Included</h3>
                <ul className="space-y-2">
                  {tour.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <FaTimes className="text-red-400 mt-1 text-xs flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="font-heading text-3xl text-dark mb-6">Travel Itinerary</h2>
              <Timeline items={tour.itinerary} />
            </div>

            {/* Gallery */}
            <div>
              <h2 className="font-heading text-3xl text-dark mb-6">Gallery</h2>
              <Gallery images={tour.gallery} />
            </div>

            {/* Reviews */}
            <div>
              <h2 className="font-heading text-3xl text-dark mb-6">
                Customer Reviews
              </h2>
              <div className="space-y-4">
                {tour.reviews.map((review, i) => (
                  <ReviewCard key={i} {...review} />
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div>
            <StickyBookingCard
              price={tour.price}
              duration={tour.duration}
              people={tour.people}
              tourId={tour.id}
            />
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
