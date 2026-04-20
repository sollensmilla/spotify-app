/**
 * GenreChartUtils: A utility module that provides functions for processing track data to generate genre counts for the GenreChart component.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * Generates a count of tracks for each genre.
 * @param {Array} tracks - An array of track objects.
 * @returns {Object} - An object with genre names as keys and track counts as values.
 */
export function getGenreCounts(tracks) {
  return tracks.reduce((acc, t) => {
    const genre = t.track_genre || "Unknown";
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});
}