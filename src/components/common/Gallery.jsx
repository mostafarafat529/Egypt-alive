import { useState } from "react";

export default function Gallery({ images }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden h-[400px] md:h-[500px]">
        <img
          src={images[selected]}
          alt="Gallery"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`rounded-xl overflow-hidden h-20 md:h-24 transition-all duration-300 ${
              selected === i
                ? "ring-2 ring-primary ring-offset-2 opacity-100"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
