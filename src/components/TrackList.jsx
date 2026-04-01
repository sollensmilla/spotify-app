export default function TrackList({ tracks }) {
  return (
    <div>
      {tracks.map((track) => (
        <div key={track.id}>
          <strong>{track.track_name}</strong> — Energy: {track.energy} — Tempo: {track.tempo} — Danceability: {track.danceability}
        </div>
      ))}
    </div>
  );
}