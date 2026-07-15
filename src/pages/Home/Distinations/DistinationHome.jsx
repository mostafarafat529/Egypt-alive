import DestinationCard from "./DisCard";
import { useData } from "../../../context/DataContext";


export default function DistinationHome() {
  const { destinations } = useData();

  return (
    <section className="bg-[#f8f5ef] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-16">

          <div>
            <span className="uppercase tracking-[4px] text-primary text-sm">
              Explore Egypt
            </span>

            <h2 className="font-heading text-5xl text-dark mt-4">
              Top Destinations
            </h2>
          </div>

          <p className="max-w-xl text-gray-600 leading-8">
            Journey through timeless cities, golden deserts, and the
            breathtaking beauty of the Nile. Every destination tells a story
            waiting to be discovered.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">

          {destinations.map((item) => (
            <DestinationCard key={item.id} {...item} />
          ))}

        </div>

      </div>
    </section>
  );
}
