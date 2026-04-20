/**
 * RangeFilter: A React component that renders a range slider for filtering tracks based on a specific attribute (e.g., energy, tempo).
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

/**
 * Renders a range slider for filtering tracks based on a specific attribute.
 * @param {{ label: String, min: Number, max: Number, step: Number, value: Array, onChange: Function, color: String }} param0 - The props object containing the label, minimum and maximum values, step size, current value range, change handler, and optional color for the slider.
 * @returns {JSX.Element} - The rendered RangeFilter component.
 */ 
export default function RangeFilter({
  label,
  min,
  max,
  step,
  value,
  onChange,
  color,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}: {value[0]} - {value[1]}
      </label>

      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="mt-2 custom-slider"
        style={{ "--slider-color": color || "#1db954" }}
      />
    </div>
  );
}