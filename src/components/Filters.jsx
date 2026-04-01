export default function Filters({ filters, setFilters }) {
  return (
    <div>
      <label>Energy Min: {filters.energyMin}</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={filters.energyMin} // <- viktigt
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            energyMin: Number(e.target.value),
          }))
        }
      />

      <label>Energy Max: {filters.energyMax}</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={filters.energyMax}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            energyMax: Number(e.target.value),
          }))
        }
      />
    </div>
  );
}