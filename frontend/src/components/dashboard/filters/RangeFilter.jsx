import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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