export default function SelectFilter({ label, value, options, onChange }) {
  return (
    <div>
      <label>{label}</label>

      <select value={value ?? ""} onChange={onChange}>
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