import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function RangeFilter({
  label,
  min,
  max,
  step,
  value,
  onChange,
}) {
  return (
    <div>
      <label>
        {label}: {value[0]} - {value[1]}
      </label>

      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}