export default function SelectFilter({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>

      <select
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm 
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   hover:border-gray-400 transition"
        value={value ?? ""}
        onChange={onChange}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}