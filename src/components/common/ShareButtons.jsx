import { FaFacebookF, FaTwitter, FaWhatsapp, FaLink } from "react-icons/fa";
import { useState } from "react";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 font-medium">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-dark transition"
      >
        <FaFacebookF size={14} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-dark transition"
      >
        <FaTwitter size={14} />
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-dark transition"
      >
        <FaWhatsapp size={14} />
      </a>
      <button
        onClick={copyLink}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-dark transition relative"
      >
        <FaLink size={14} />
        {copied && (
          <span className="absolute -top-8 bg-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
