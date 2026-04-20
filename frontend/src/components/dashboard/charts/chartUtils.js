/**
 * Chart Utilities: A collection of utility functions for processing and calculating data for charts in the dashboard, such as calculating average tempo and energy from a list of tracks.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * Calculates the average tempo and energy from a list of tracks.
 * @param {Array} tracks - An array of track objects.
 * @returns {Object} - An object containing the average tempo and energy.
 */
export const calculateAverages = (tracks) => {
    const avgTempo =
        tracks.reduce((sum, t) => sum + t.tempo, 0) / tracks.length;

    const avgEnergy =
        tracks.reduce((sum, t) => sum + t.energy, 0) / tracks.length;

    return { avgTempo, avgEnergy };
};