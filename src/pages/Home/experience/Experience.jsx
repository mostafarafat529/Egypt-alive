import ExpeCard from "./ExpeCard";
import {experiences} from "../../../data/experience"


export default function Experience() {

  return (
    <section className="bg-[#F8F5EF] py-24 ">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="max-w-3xl mx-auto text-center mb-20">

          <p className="uppercase tracking-[4px] text-primary text-sm mb-4">
            Experiences
          </p>

          <h2 className="font-heading text-4xl md:text-5xl text-dark">
            Unforgettable Experiences
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            Every journey we create is carefully designed to immerse you in
            Egypt's rich history, luxurious hospitality, breathtaking
            landscapes and unforgettable adventures.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {experiences.map((experience) => (
            <ExpeCard
              key={experience.id}
              {...experience}
            />
          ))}

        </div>

      </div>

    </section>
  );
}