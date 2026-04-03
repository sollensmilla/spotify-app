import { formatKey } from "./trackUtils";

export default function TrackItem({ track }) {
  if (!track) return null;

  return (
    <div>
      <strong>{track.track_name}</strong>
      — 🎧 {track.track_genre}
      — 🔥 {track.energy}
      — 💃 {track.danceability}
      — 🎵 {track.tempo} BPM
      — 🎼 {formatKey(track.key)}
      — ⭐ {track.popularity}
      — 🎸 Acoustic: {track.acousticness}
      — {track.explicit ? "🅴 Explicit" : "Clean"}
    </div>
  );
}