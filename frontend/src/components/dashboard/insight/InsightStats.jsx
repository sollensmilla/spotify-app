/**
 * Renders the average tempo and energy of a collection of tracks.
 * @param {{ avgTempo: Number, avgEnergy: Number }} param0 - The props object containing the average tempo and energy.
 * @returns {JSX.Element} - The rendered InsightStats component.
 */
export default function InsightStats({ avgTempo, avgEnergy }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Tempo
        </p>
        <p className="text-lg font-semibold text-gray-800">
          {avgTempo.toFixed(1)} BPM
        </p>
      </div>

      <div className="p-3 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Energy
        </p>
        <p className="text-lg font-semibold text-gray-800">
          {avgEnergy.toFixed(2)}
        </p>
      </div>
    </div>
  );
}