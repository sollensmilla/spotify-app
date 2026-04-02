import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Filters({ filters, setFilters }) {
  const handleRange = (minKey, maxKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [minKey]: value[0],
      [maxKey]: value[1],
    }));
  };

  const keys = [
    { value: -1, label: "Unknown" },
    { value: 0, label: "C" },
    { value: 1, label: "C#/Db" },
    { value: 2, label: "D" },
    { value: 3, label: "D#/Eb" },
    { value: 4, label: "E" },
    { value: 5, label: "F" },
    { value: 6, label: "F#/Gb" },
    { value: 7, label: "G" },
    { value: 8, label: "G#/Ab" },
    { value: 9, label: "A" },
    { value: 10, label: "A#/Bb" },
    { value: 11, label: "B" },
  ];

  return (
    <div>
      <h3>Filters</h3>

      <label>
        Energy: {filters.energyMin} - {filters.energyMax}
      </label>
      <Slider
        range
        min={0}
        max={1}
        step={0.01}
        value={[filters.energyMin, filters.energyMax]}
        onChange={(val) => handleRange("energyMin", "energyMax", val)}
      />

      <label>
        Tempo: {filters.tempoMin} - {filters.tempoMax}
      </label>
      <Slider
        range
        min={0}
        max={200}
        value={[filters.tempoMin, filters.tempoMax]}
        onChange={(val) => handleRange("tempoMin", "tempoMax", val)}
      />

      <label>
        Danceability: {filters.danceabilityMin} - {filters.danceabilityMax}
      </label>
      <Slider
        range
        min={0}
        max={1}
        step={0.01}
        value={[filters.danceabilityMin, filters.danceabilityMax]}
        onChange={(val) =>
          handleRange("danceabilityMin", "danceabilityMax", val)
        }
      />

      <label>
  Popularity: {filters.popularityMin} - {filters.popularityMax}
</label>
<Slider
  range
  min={0}
  max={100}
  value={[filters.popularityMin, filters.popularityMax]}
  onChange={(val) =>
    handleRange("popularityMin", "popularityMax", val)
  }
/>

<label>
  Acousticness: {filters.acousticnessMin} - {filters.acousticnessMax}
</label>
<Slider
  range
  min={0}
  max={1}
  step={0.01}
  value={[filters.acousticnessMin, filters.acousticnessMax]}
  onChange={(val) =>
    handleRange("acousticnessMin", "acousticnessMax", val)
  }
/>

<label>Explicit</label>
<select
  value={filters.explicit ?? ""}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      explicit:
        e.target.value === ""
          ? null
          : e.target.value === "true"
    }))
  }
>
  <option value="">All</option>
  <option value="true">Explicit</option>
  <option value="false">Clean</option>
</select>

<label>Genre</label>
<input
  type="text"
  value={filters.genre}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      genre: e.target.value
    }))
  }
/>

<label>Track name</label>
<input
  type="text"
  value={filters.name}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      name: e.target.value
    }))
  }
/>

      <label>Key</label>
      <select
        value={filters.key ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            key: e.target.value === "" ? null : Number(e.target.value),
          }))
        }
      >
        <option value="">All keys</option>
        {keys.map((k) => (
          <option key={k.value} value={k.value}>
            {k.label}
          </option>
        ))}
      </select>
    </div>
  );
}