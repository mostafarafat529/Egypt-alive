import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ExpeCard({  image,title,  description}) {
  return (
    <div className="group bg-white rounded-3xl border border-gray-200 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">

      {/* Image */}

<div className="overflow-hidden rounded-2xl">
  <img
    src={image}
    alt={title}
    className="w-full h-56 mb-3 object-cover transition duration-500 group-hover:scale-110"
  />
</div>

<h3 className="font-heading text-3xl text-dark mt-6 mb-4">
  {title}
</h3>

<p className="text-gray-600 leading-8">
  {description}
</p>

      {/* Button */}

      <Link to={`/experiences/2`} className="mt-8 flex items-center gap-2 text-primary font-semibold group">
        Learn More
        <FaArrowRight className="transition duration-300 group-hover:translate-x-2" />
      </Link>

    </div>
  );
}