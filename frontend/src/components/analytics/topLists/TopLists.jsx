export default function TopLists({ tracks }) {
  if (!tracks.length) return null;

  const topPopular = [...tracks]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  return (
    <div>
      <h3>Top Popular Songs</h3>
      <ul>
        {topPopular.map((t) => (
          <li key={t.id}>
            {t.track_name} ({t.popularity})
          </li>
        ))}
      </ul>
    </div>
  );
}