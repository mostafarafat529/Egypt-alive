export default function Timeline({ items }) {
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div key={i} className="relative flex gap-6">
          {/* Line */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
              {item.day}
            </div>
            {i < items.length - 1 && (
              <div className="w-px flex-1 bg-primary/20 my-1" />
            )}
          </div>

          {/* Content */}
          <div className="pb-8 flex-1">
            <h4 className="font-heading text-lg text-dark mb-1">
              {item.title}
            </h4>
            <p className="text-gray-600 text-sm leading-7">{item.description}</p>
            {item.image && (
              <div className="mt-3 rounded-xl overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
