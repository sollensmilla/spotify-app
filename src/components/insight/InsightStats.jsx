export default function InsightStats({ avgTempo, avgEnergy }) {
  return (
    <>
      <p>Average tempo: {avgTempo.toFixed(1)}</p>
      <p>Average energy: {avgEnergy.toFixed(2)}</p>
    </>
  );
}