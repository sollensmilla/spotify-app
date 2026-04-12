import InsightStats from "./InsightStats";
import { calculateAverages, getEnergyLabel } from "./insightUtils";

export default function InsightBox({ tracks }) {
  if (!tracks?.length) return null;

  const { avgTempo, avgEnergy } = calculateAverages(tracks);

  return (
    <div style={{ margin: "1rem 0" }}>
      <h3>Insights</h3>

      <InsightStats avgTempo={avgTempo} avgEnergy={avgEnergy} />

      <p>
        Songs in your vibe cluster around {avgTempo.toFixed(0)} BPM with{" "}
        {getEnergyLabel(avgEnergy)} energy.
      </p>
    </div>
  );
}