export default function TextFilter({ label, value, onChange }) {
  return (
    <div className="filter-group">
      <label className="filter-label">{label}</label>

      <input
        className="filter-input"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}