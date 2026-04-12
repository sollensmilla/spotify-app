import { formatKey } from "./trackUtils";

export default function TrackItem({ track }) {
  if (!track) return null;

  return (
    <tr>
      <td>{track.track_name}</td>
      <td>{track.track_genre}</td>
      <td>{track.energy.toFixed(2)}</td>
      <td>{track.danceability.toFixed(2)}</td>
      <td>{track.tempo}</td>
      <td>{formatKey(track.key)}</td>
      <td>{track.popularity}</td>
      <td>{track.acousticness.toFixed(2)}</td>
      <td>{track.explicit ? "Yes" : "No"}</td>
    </tr>
  );
}