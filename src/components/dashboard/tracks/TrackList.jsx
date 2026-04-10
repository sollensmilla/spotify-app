import TrackItem from "./TrackItem";
import "./trackList.css";

export default function TrackList({ tracks }) {
  if (!tracks) return null;

  return (
    <div>
      <h3>Tracks</h3>

      <table className="track-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Energy</th>
            <th>Dance</th>
            <th>Tempo</th>
            <th>Key</th>
            <th>Pop</th>
            <th>Acoustic</th>
            <th>Explicit</th>
          </tr>
        </thead>

        <tbody>
          {tracks.filter(Boolean).map((track) => (
            <TrackItem key={track.id} track={track} />
          ))}
        </tbody>
      </table>
    </div>
  );
}