/**
 * Renders a legend item for a chart, displaying a colored circle and a label.
 * @param {{ color: string, label: string }} param0 - The props object containing the color and label for the legend item.
 * @returns {JSX.Element} - The rendered LegendItem component.
 */
export default function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: color,
        }}
      />
      <span style={{ fontSize: "0.8rem", color: "#555" }}>
        {label}
      </span>
    </div>
  );
}