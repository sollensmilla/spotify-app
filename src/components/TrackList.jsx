export default function TrackList({ tracks }) {
    const keyMap = {
  "-1": "Unknown",
  0: "C",
  1: "C#/Db",
  2: "D",
  3: "D#/Eb",
  4: "E",
  5: "F",
  6: "F#/Gb",
  7: "G",
  8: "G#/Ab",
  9: "A",
  10: "A#/Bb",
  11: "B",
};

  return (
    <div>
      <h3>Tracks</h3>

      {tracks.map((track) => (
        <div key={track.id}>
          <strong>{track.track_name}</strong> — Energy: {track.energy} — Tempo: {track.tempo} — Danceability: {track.danceability} - Key: {keyMap[track.key]}
        </div>
      ))}
    </div>
  );
}