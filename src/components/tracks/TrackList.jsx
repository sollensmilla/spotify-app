import TrackItem from "./TrackItem";

export default function TrackList({ tracks }) {
  if (!tracks) return null;

  return (
    <div>
      <h3>Tracks</h3>

      {tracks.filter(Boolean).map((track) => (
        <TrackItem key={track.id} track={track} />
      ))}
    </div>
  );
}