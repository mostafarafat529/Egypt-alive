import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function BlogCard({id, image, category, title, description, date}) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group flex flex-col h-full">

      {/* Image */}
      <div className="overflow-hidden h-48 sm:h-64 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">

        <span className="text-primary uppercase tracking-[3px] text-xs font-semibold">
          {category}
        </span>

        <h3 className="font-heading text-lg sm:text-2xl text-dark mt-2 sm:mt-3 mb-2 sm:mb-4 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 leading-7 text-sm mb-4 sm:mb-6 line-clamp-3 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-400">
            {date}
          </span>

          <Link
            to={`/travel-blog/${id}`}
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            Read More
            <FaArrowRight />
          </Link>
        </div>

      </div>

    </article>
  );
}
