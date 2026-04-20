/**
 * SelectFilter: A React component that renders a dropdown select filter for filtering tracks based on a specific attribute (e.g., key, mode). The component displays a label and a select input with options defined in the props. It allows users to select a specific value or choose "All" to include all values.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * Renders a dropdown select filter for filtering tracks based on a specific attribute.
 * @param {{ label: String, value: String, options: Array, onChange: Function }} param0 - The props object containing the label, current value, options, and change handler.
 * @returns {JSX.Element} - The rendered SelectFilter component.
 */
export default function SelectFilter({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>

      <select
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm 
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   hover:border-gray-400 transition"
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