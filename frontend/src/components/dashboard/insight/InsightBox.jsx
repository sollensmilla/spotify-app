import InsightStats from "./InsightStats";
import { calculateAverages, getEnergyLabel } from "./insightUtils";

export default function InsightBox({ tracks }) {
  if (!tracks?.length) return null;

  const { avgTempo, avgEnergy } = calculateAverages(tracks);

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
    </div>
  );
}