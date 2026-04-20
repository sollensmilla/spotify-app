/**
 * TextFilter: A React component that renders a text input field for filtering tracks based on a specific attribute (e.g., track name, artist name). The component displays a label and allows users to enter text to filter the tracks accordingly. It supports custom styling through CSS classes.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * Renders a text input field for filtering tracks based on a specific attribute.
 * @param {{ label: String, value: String, onChange: Function }} param0 - The props object containing the label, current value, and change handler.
 * @returns {JSX.Element} - The rendered TextFilter component.
 */
export default function TextFilter({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm 
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   hover:border-gray-400 transition"
      />
    </div>
  );
}