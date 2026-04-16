import { formatKey } from "./trackUtils";

export default function TrackItem({ track }) {
  if (!track) return null;

const artistNames = track.artists
  ?.map(a => a.artist_name)
  .join(", ");

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3 font-medium text-gray-800">
        {track.track_name}
        <div className="text-xs text-gray-500">{artistNames}</div>
      </td>

      <td className="px-4 py-3">{track.track_genre}</td>
      <td className="px-4 py-3">{track.energy.toFixed(2)}</td>
      <td className="px-4 py-3">{track.danceability.toFixed(2)}</td>
      <td className="px-4 py-3">{track.tempo}</td>
      <td className="px-4 py-3">{formatKey(track.key)}</td>
      <td className="px-4 py-3">{track.popularity}</td>
      <td className="px-4 py-3">{track.acousticness.toFixed(2)}</td>
      <td className="px-4 py-3">
        {track.explicit ? "Yes" : "No"}
      </td>
    </tr>
  );
}