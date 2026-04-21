/**
 * Component for selecting which audio feature to display in the popularity chart.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * MetricSelector: A component for selecting which audio feature to display in the popularity chart.
 * 
 * @param {{ metric: string, setMetric: Function }} param0 - The props object containing the currently selected metric and a function to update it.
 * @returns {JSX.Element} - The rendered MetricSelector component.
 */
export default function MetricSelector({ metric, setMetric }) {
  const options = [
    { key: "danceability", label: "Danceability" },
    { key: "energy", label: "Energy" },
    { key: "tempo", label: "Tempo (BPM)" },
    { key: "acousticness", label: "Acousticness" },
    { key: "instrumentalness", label: "Instrumentalness" },
  ];

  return (
    <div style={{ marginBottom: "1rem" }}>
      {options.map((m) => (
        <button
          key={m.key}
          onClick={() => setMetric(m.key)}
          style={{
            marginRight: "8px",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: metric === m.key ? "#1db954" : "#ddd",
            color: metric === m.key ? "white" : "black",
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}