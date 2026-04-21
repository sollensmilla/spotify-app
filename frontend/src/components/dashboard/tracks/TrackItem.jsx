/**
 * TrackItem: A React component that renders a table row displaying information about a single track, including its name, artists, genre, energy, danceability, tempo, key, popularity, acousticness, and whether it is explicit.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import { formatKey } from "./trackUtils";

/**
 * Renders a table row displaying information about a single track.
 * @param {{ track: Object }} param0 - The props object containing the track data.
 * @returns {JSX.Element} - The rendered TrackItem component.
 */
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
      <td className="px-4 py-3">{track.instrumentalness.toFixed(2)}</td>
      <td className="px-4 py-3">
        {track.explicit ? "Yes" : "No"}
      </td>
    </tr>
  );
}