export default function TopLists({ topTracks }) {
  if (!topTracks?.length) return null;

  const fallback = "/images/default.png";

  return (
    <div
      style={{
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
        Top 10 Most Popular Songs
      </h3>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {topTracks.slice(0, 10).map((t, index) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "10px",
              background: "#2a2a2a",
              transition: "0.2s"
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

            <img
              src={t.image_url || fallback}
              alt={t.track_name}
              width={50}
              height={50}
              style={{
                borderRadius: "10px",
                marginRight: "14px" 
              }}
              onError={(e) => (e.target.src = fallback)}
            />

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "600", color: "#fff" }}>
                {t.track_name}
              </div>

              <div style={{ fontSize: "0.85rem", color: "#bbb" }}>
                {t.artists?.map(a => a.artist_name).join(", ")}
              </div>

              <div style={{ fontSize: "0.85rem", color: "#bbb" }}>
                {t.albums?.map(a => a.album_name).join(", ")}
              </div>

              <div style={{ fontSize: "0.85rem", color: "#bbb" }}>
                Popularity: {t.popularity}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}