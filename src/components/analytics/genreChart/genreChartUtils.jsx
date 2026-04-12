export function getGenreCounts(tracks) {
  return tracks.reduce((acc, t) => {
    const genre = t.track_genre || "Unknown";
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});
}