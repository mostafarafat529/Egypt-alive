export function FormError({ message }) {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1.5 animate-fade-in">{message}</p>;
}

export function inputClass(field, errors = {}) {
  if (errors[field]) {
    return "w-full border border-red-400 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200";
  }
  return "w-full border border-gray-200 rounded-xl px-4 py-3 text-dark text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200";
}

export function inputClassDark(field, errors = {}) {
  if (errors[field]) {
    return "w-full bg-white/5 border border-red-400 rounded-xl px-4 py-3 text-cream placeholder-cream/30 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400/20 transition-all duration-200";
  }
  return "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200";
}

export function validateNotEmpty(fields) {
  const errors = {};
  for (const [key, label] of Object.entries(fields)) {
    if (!key || !label) continue;
  }
  return errors;
}

export function focusFirstError(fieldRefs) {
  const firstKey = Object.keys(fieldRefs)[0];
  if (firstKey && fieldRefs[firstKey]?.current) {
    fieldRefs[firstKey].current.focus();
    fieldRefs[firstKey].current.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
