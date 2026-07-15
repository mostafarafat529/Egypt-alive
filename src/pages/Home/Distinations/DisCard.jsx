import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DestinationCard({id, image, title, subtitle, large = false}) {

  const navigate = useNavigate()

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl cursor-pointer ${
        large ? "md:col-span-2 md:row-span-2 h-[520px]" : "h-[250px]"
      }`}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 p-6 w-full">
        <p className="text-primary text-sm uppercase tracking-[3px]">
          {subtitle}
        </p>

        <h3 className="text-white text-2xl font-heading mt-2">
          {title}
        </h3>

        <button className="mt-5 flex items-center gap-2 text-primary font-medium" onClick={()=>navigate(`/destinations/${id}`)}>
          Explore
          <FaArrowRight className="text-sm transition group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}