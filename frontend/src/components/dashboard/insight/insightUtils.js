/**
 * insightUtils: Utility functions for calculating insights about a collection of tracks, including average tempo and energy, and categorizing energy levels as "high" or "low". 
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * Calculates the average tempo and energy of a collection of tracks.
 * @param {Array} tracks - The list of tracks.
 * @returns {Object} - An object containing the average tempo and energy.
 */
export const calculateAverages = (tracks) => {
    const avgTempo =
        tracks.reduce((sum, t) => sum + t.tempo, 0) / tracks.length;

    const avgEnergy =
        tracks.reduce((sum, t) => sum + t.energy, 0) / tracks.length;

    return { avgTempo, avgEnergy };
};

/**
 * Gets the label for the energy level based on its value.
 * @param {Number} energy - The energy value.
 * @returns {String} - The label for the energy level.
 */
export const getEnergyLabel = (energy) => {
    return energy > 0.6 ? "high" : "low";
};