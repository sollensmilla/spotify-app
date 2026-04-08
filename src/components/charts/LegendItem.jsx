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