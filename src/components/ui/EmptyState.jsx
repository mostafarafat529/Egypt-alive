export default function EmptyState({
  icon: Icon,
  title = "No data found",
  description = "",
  action,
  onAction,
  variant = "default",
}) {
  const variants = {
    default: { bg: "bg-white/5", border: "border-white/10", iconColor: "text-cream/15", titleColor: "text-cream/60", descColor: "text-cream/40" },
    light: { bg: "bg-gray-50", border: "border-gray-200", iconColor: "text-gray-300", titleColor: "text-gray-500", descColor: "text-gray-400" },
    dashboard: { bg: "bg-white/5", border: "border-white/10", iconColor: "text-cream/15", titleColor: "text-cream/60", descColor: "text-cream/40" },
  };

  const v = variants[variant] || variants.default;

  return (
    <div className={`${v.bg} border ${v.border} rounded-2xl p-16 text-center`}>
      {Icon && <Icon className={`text-5xl mx-auto mb-4 ${v.iconColor}`} />}
      <h3 className={`font-heading text-xl ${v.titleColor} mb-2`}>{title}</h3>
      {description && <p className={`${v.descColor} text-sm`}>{description}</p>}
      {action && onAction && (
        <button
          onClick={onAction}
          className="mt-6 bg-primary text-dark font-semibold px-6 py-3 rounded-xl text-sm hover:scale-105 transition-all duration-200"
        >
          {action}
        </button>
      )}
    </div>
  );
}
