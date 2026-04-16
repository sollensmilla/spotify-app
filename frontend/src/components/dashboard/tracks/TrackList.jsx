import TrackItem from "./TrackItem";

export default function TrackList({ tracks }) {
  if (!tracks) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Tracks
      </h3>

      <div className="overflow-hidden rounded-2xl shadow-md border border-gray-100">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-xs uppercase text-gray-500 tracking-wide">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Genre</th>
                <th className="px-4 py-3">Energy</th>
                <th className="px-4 py-3">Dance</th>
                <th className="px-4 py-3">Tempo</th>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Pop</th>
                <th className="px-4 py-3">Acoustic</th>
                <th className="px-4 py-3">Explicit</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {tracks.filter(Boolean).map((track) => (
                <TrackItem key={track.id} track={track} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}