import InsightStats from "./InsightStats";
import { getClusterVibe } from "../../../utils/vibeUtils";
import { calculateAverages, getEnergyLabel } from "./insightUtils";

/**
 * Renders a box displaying insights about a collection of tracks.
 * @param {{ tracks: Array }} param0 - The props object containing the list of tracks.
 * @returns {JSX.Element} - The rendered InsightBox component.
 */
export default function InsightBox({ tracks }) {
  if (!tracks?.length) return null;

  const { avgTempo, avgEnergy } = calculateAverages(tracks);

  const clusters = {};

tracks.forEach((t) => {
  if (!clusters[t.cluster]) clusters[t.cluster] = [];
  clusters[t.cluster].push(t);
});

  return (
    <div className="mt-6 p-5 bg-white rounded-2xl shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Insights
      </h3>

      <InsightStats avgTempo={avgTempo} avgEnergy={avgEnergy} />

      <p className="mt-4 text-sm text-gray-600 leading-relaxed">
        Songs in your vibe cluster around{" "}
        <span className="font-semibold text-gray-800">
          {avgTempo.toFixed(0)} BPM
        </span>{" "}
        with{" "}
        <span className="font-semibold text-green-600">
          {getEnergyLabel(avgEnergy)}
        </span>{" "}
        energy.
      </p>

<div className="mt-4 space-y-3">
  {Object.entries(clusters).map(([id, ts]) => {
const avgEnergy =
  ts.reduce((s, t) => s + t.energy, 0) / ts.length;

const avgTempo =
  ts.reduce((s, t) => s + t.tempo, 0) / ts.length;

const avgAcousticness =
  ts.reduce((s, t) => s + t.acousticness, 0) / ts.length;

const avgInstrumentalness =
  ts.reduce((s, t) => s + t.instrumentalness, 0) / ts.length;

const avgDanceability =
  ts.reduce((s, t) => s + t.danceability, 0) / ts.length;

const vibe = getClusterVibe({
  avgEnergy,
  avgTempo,
  avgAcousticness,
  avgInstrumentalness,
  avgDanceability,
});
    return (
      <div
        key={id}
        className="p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm"
      >
        <div className="font-semibold text-gray-800">
          {vibe.label} - Cluster {id}
        </div>

        <div className="text-sm text-gray-500 mb-1">
          {vibe.description}
        </div>

        <div className="text-xs text-gray-400">
          {ts.length} tracks • {avgTempo.toFixed(0)} BPM • energy {avgEnergy.toFixed(2)}
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
}