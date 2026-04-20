export default function TopLists({ topTracks }) {
  if (!topTracks?.length) return null;

  const fallback = "/images/default.png";

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Top Popular Songs</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {topTracks.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              gap: "10px"
            }}
          >
           <img
              src={t.image_url || fallback}
              alt={t.track_name}
              width={60}
              height={60}
              style={{ borderRadius: "8px" }}
              onError={(e) => (e.target.src = fallback)}
            />

            <div>
              <div>{t.track_name}</div>
              <div style={{ fontSize: "0.8rem", color: "gray" }}>
                Popularity: {t.popularity}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}