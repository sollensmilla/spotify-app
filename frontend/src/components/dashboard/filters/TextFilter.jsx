export default function TextFilter({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm 
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   hover:border-gray-400 transition"
      />
    </div>
  );
}