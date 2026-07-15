import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function BlogCard({id, image, category, title, description, date}) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">

      {/* Image */}

      <div className="overflow-hidden h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      {/* Content */}

      <div className="p-6">

        <span className="text-primary uppercase tracking-[3px] text-xs font-semibold">
          {category}
        </span>

        <h3 className="font-heading text-2xl text-dark mt-3 mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 leading-7 text-sm mb-6">
          {description}
        </p>

        <div className="flex items-center justify-between">

          <span className="text-xs text-gray-400">
            {date}
          </span>

          <Link
            to={`/travel-blog/${id}`}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Read More
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </article>
  );
}