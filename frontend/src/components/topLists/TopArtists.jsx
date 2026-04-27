/**
 * Renders a list of the top 10 artists based on track count.
 * 
 * @param {{ topArtists: Array }} param0 - The props object containing the list of top artists.
 * @returns {JSX.Element|null} - The rendered TopArtists component or null if no artists are provided.
 */
export default function TopArtists({ topArtists }) {
  if (!topArtists?.length) return null;

  return (
    <div
      style={{
        flex: "1",
        marginTop: "2rem",
        background: "#1e1e1e",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        maxWidth: "500px",
        color: "#f5f5f5"
      }}
    >
      <h3 style={{ marginBottom: "1rem", fontWeight: "600" }}>
        Top 10 Artists
      </h3>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {topArtists.slice(0, 10).map((a, index) => (
          <li
  key={index}
  style={{
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "10px",
    background: "#2a2a2a"
  }}
>
  <div
    style={{
      width: "40px",
      marginRight: "10px",
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: index === 0 ? "gold" : "#ccc"
    }}
  >
    #{index + 1}
  </div>

    <div
    style={{
      width: "70px",
      height: "70px",
      marginRight: "14px",
      borderRadius: "10px",
      background: "transparent"
    }}
  />

  <div>
    <div style={{ fontWeight: "600", color: "#fff" }}>
      {a.artist_name}
    </div>

    <div style={{ fontSize: "0.85rem", color: "#bbb" }}>
      {a.count} tracks • Avg popularity:{" "}
      {a.average_popularity?.toFixed(1) ?? "N/A"}
    </div>
  </div>
</li>
        ))}
      </ul>
    </div>
  );
}