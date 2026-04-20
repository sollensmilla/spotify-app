/**
 * InsightBox: A React component that displays insights about a collection of tracks, including average tempo and energy. It calculates these averages using utility functions and presents the information in a styled box with a brief description of the vibe of the tracks based on their tempo and energy levels.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import InsightStats from "./InsightStats";
import { calculateAverages, getEnergyLabel } from "./insightUtils";

/**
 * Renders a box displaying insights about a collection of tracks.
 * @param {{ tracks: Array }} param0 - The props object containing the list of tracks.
 * @returns {JSX.Element} - The rendered InsightBox component.
 */
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