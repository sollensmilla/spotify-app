export default function InsightBox({ tracks }) {
  if (!tracks.length) return null;

  const avgTempo =
    tracks.reduce((sum, t) => sum + t.tempo, 0) / tracks.length;

  const avgEnergy =
    tracks.reduce((sum, t) => sum + t.energy, 0) / tracks.length;

  return (
    <div style={{ margin: "1rem 0" }}>
      <h3>Insights</h3>
      <p>Average tempo: {avgTempo.toFixed(1)}</p>
      <p>Average energy: {avgEnergy.toFixed(2)}</p>

      <p>
        Songs in your vibe cluster around {avgTempo.toFixed(0)} BPM with{" "}
        {avgEnergy > 0.6 ? "high" : "low"} energy.
      </p>
    </div>
  );
}