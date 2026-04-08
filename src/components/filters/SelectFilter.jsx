export default function SelectFilter({ label, value, options, onChange }) {
return (
    <div className="filter-group">
      <label className="filter-label">{label}</label>

      <select
        className="filter-select"
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