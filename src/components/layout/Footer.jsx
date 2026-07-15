import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const collections = [
    "Cultural Heritage",
    "Desert Expeditions",
    "Nile Cruises",
    "Wellness Retreats",
  ];

  const company = [
    "About",
    "Sustainability",
    "Careers",
    "Press Kit",
  ];

  const legal = [
    "Privacy Policy",
    "Terms of Service",
  ];

  return (
    <footer className="bg-[#11100C] border-t border-primary/20 shadow-[0_-12px_35px_rgba(0,0,0,0.45)] mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h3 className="font-heading text-primary text-2xl mb-3">
              Egypt Alive
            </h3>

            <p className="text-cream/65 text-sm leading-6">
              Redefining luxury travel through the lens of Egyptian heritage
              and timeless experiences.
            </p>

            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="uppercase text-xs tracking-[2px] text-primary font-semibold mb-4">
              Collections
            </h4>

            <div className="flex flex-col gap-2">
              {collections.map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-sm text-cream/60 hover:text-primary transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="uppercase text-xs tracking-[2px] text-primary font-semibold mb-4">
              Company
            </h4>

            <div className="flex flex-col gap-2">
              {company.map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-sm text-cream/60 hover:text-primary transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="uppercase text-xs tracking-[2px] text-primary font-semibold mb-4">
              Legal
            </h4>

            <div className="flex flex-col gap-2">
              {legal.map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-sm text-cream/60 hover:text-primary transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-primary/15 mt-8 pt-5">
          <p className="text-center text-xs text-cream/40">
            © {year} Egypt Alive. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}