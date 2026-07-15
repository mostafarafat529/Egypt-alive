// DisCard = Destination Card
// كارت واحد بيغطي كل الأشكال اللي في تصميم صفحة Destinations:
//   - default: صورة + تدرج غامق من تحت + عنوان/وصف تحت (Cairo, Luxor, Red Sea, Aswan)
//   - banner:  صورة عريضة full-width + نص في النص (Alexandria)
// الـ CTA له وضعين:
//   - style: "link"   -> نص + سهم (زي Explore Tours / Discover Coastline)
//   - style: "button" -> زرار دهبي كامل (زي View Heritage / Book Cruise)
//   - position: "floating" -> الزرار بيتعلق فوق يمين الكارت لوحده (زي Book Cruise)

import { Link, useNavigate } from "react-router-dom";

export default function DisCard({ id, image, title, description, quote, label, cta, variant = "default"}) {
  const isBanner = variant === "banner";
  const floatingCta = cta?.position === "floating" && !isBanner;
  const navigate = useNavigate();

  return (
    <div
      className="relative overflow-hidden rounded-sm group h-full cursor-pointer"
      onClick={() => navigate(`/destinations/${id}`)}
    >
      {/* الصورة */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* تدرج غامق فوق الصورة عشان النص يبان */}
      <div
        className={
          isBanner
            ? "absolute inset-0 bg-dark/55"
            : "absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"
        }
      />

      {/* زرار عايم منفصل (لما position يكون floating) */}
      {floatingCta && (
        <Link
          to={cta.href}
          className="absolute top-4 right-4 z-10 bg-primary text-dark text-[11px] font-semibold tracking-wide uppercase px-4 py-2 rounded-full hover:bg-primary-light transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {cta.text}
        </Link>
      )}

      <div
        className={
          isBanner
            ? "relative h-full flex flex-col items-center justify-center text-center px-6"
            : "relative h-full flex flex-col justify-end p-6"
        }
      >
        <h3
          className={`font-heading text-cream ${
            isBanner ? "text-4xl md:text-5xl mb-3" : "text-2xl mb-1"
          }`}
        >
          {title}
        </h3>

        {quote && (
          <p className="italic text-cream/80 text-sm max-w-md mx-auto mb-5">
            &ldquo;{quote}&rdquo;
          </p>
        )}

        {description && !isBanner && (
          <p className="text-cream/70 text-sm max-w-xs mb-3">{description}</p>
        )}

        {/* الصف السفلي: اللابل (لو موجود) على الشمال + الـ CTA على اليمين */}
        {(label || (cta && !floatingCta)) && (
          <div className="flex items-center justify-between gap-3">
            {label && (
              <span className="flex items-center gap-1 text-primary text-[11px] tracking-[0.15em] uppercase">
                <PinIcon />
                {label}
              </span>
            )}

            {cta && !floatingCta && cta.style === "button" && (
              <Link
                to={cta.href}
                className="w-fit bg-primary text-dark text-[11px] font-semibold tracking-wide uppercase px-5 py-2.5 rounded-full hover:bg-primary-light transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {cta.text}
              </Link>
            )}

            {cta && !floatingCta && cta.style === "link" && (
              <Link
                to={cta.href}
                className="w-fit inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold tracking-wide uppercase hover:gap-2.5 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                {cta.text}
                <ArrowIcon />
              </Link>
            )}
          </div>
        )}

        {/* زرار البانر (Alexandria) بيبقى لوحده في النص تحت الكوت */}
        {isBanner && cta && (
          <Link
            to={cta.href}
            className="mt-2 bg-primary text-dark text-[11px] font-semibold tracking-wide uppercase px-6 py-2.5 rounded-full hover:bg-primary-light transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {cta.text}
          </Link>
        )}
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}