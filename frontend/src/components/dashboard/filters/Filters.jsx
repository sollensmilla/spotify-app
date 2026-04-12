import RangeFilter from "./RangeFilter";
import SelectFilter from "./SelectFilter";
import TextFilter from "./TextFilter";
import "./filters.css";

import {
  rangeFilters,
  selectFilters,
  textFilters,
} from "./filterConfig";

import { handleRangeChange, keyOptions } from "./filterUtils";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="filters-container">
      <h3>Filters</h3>

      {rangeFilters.map((f) => (
        <RangeFilter
          key={f.label}
          label={f.label}
          min={f.min}
          max={f.max}
          step={f.step}
value={[
  filters[f.minKey] ?? f.min,
  filters[f.maxKey] ?? f.max,
]}
          onChange={(val) =>
            handleRangeChange(setFilters, f.minKey, f.maxKey, val)
          }
          color={f.color} 
        />
      ))}

      {selectFilters.map((f) => (
        <SelectFilter
          key={f.label}
          label={f.label}
          value={filters[f.key]}
          options={f.options}
          onChange={(e) => {
            let value = e.target.value;

            if (f.key === "explicit") {
              value =
                value === ""
                  ? null
                  : value === "true";
            }

            setFilters((prev) => ({
              ...prev,
              [f.key]: value,
            }));
          }}
        />
      ))}

      {textFilters.map((f) => (
        <TextFilter
          key={f.label}
          label={f.label}
          value={filters[f.key]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              [f.key]: e.target.value,
            }))
          }
        />
      ))}

      <SelectFilter
        label="Key"
        value={filters.key}
        options={keyOptions}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            key: e.target.value === "" ? null : Number(e.target.value),
          }))
        }
      />
    </div>
  );
}