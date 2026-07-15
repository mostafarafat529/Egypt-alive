import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

export default function HeroSearch() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    destination: "",
    travelDate: "",
    travelers: "2",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!filters.destination.trim()) {
      alert("Please enter a destination");
      return;
    }

    console.log(filters);

    navigate("/destinations");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="my-16 w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Destination */}
        <div className="px-5 py-5 border-b md:border-b-0 md:border-r border-gray-200">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
            Destination
          </p>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-primary text-lg flex-shrink-0" />

            <input
              type="text"
              name="destination"
              value={filters.destination}
              onChange={handleChange}
              placeholder="Where would you like to go?"
              className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Travel Date */}
        <div className="px-5 py-5 border-b md:border-b-0 md:border-r border-gray-200">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
            Travel Date
          </p>

          <div className="flex items-center gap-3">
            <MdDateRange className="text-primary text-xl flex-shrink-0" />

            <input
              type="date"
              name="travelDate"
              value={filters.travelDate}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-sm text-gray-800 cursor-pointer"
            />
          </div>
        </div>

        {/* Travelers */}
        <div className="px-5 py-5 border-b md:border-b-0 md:border-r border-gray-200">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
            Travelers
          </p>

          <div className="flex items-center gap-3">
            <FaUserFriends className="text-primary text-lg flex-shrink-0" />

            <select
              name="travelers"
              value={filters.travelers}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-sm text-gray-800 cursor-pointer"
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center justify-center p-5">
          <button
            type="submit"
            className="w-full h-12 bg-[#0D3557] text-white rounded-md font-semibold uppercase tracking-wide hover:bg-[#144b78] transition-all duration-300 hover:scale-[1.02]"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}