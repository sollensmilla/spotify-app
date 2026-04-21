/**
 * popularityUtils: Utility functions for processing track data into popularity buckets and calculating average metric values for each bucket.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * Creates popularity buckets from a list of tracks.
 * 
 * @param {Object[]} tracks - The list of tracks to bucket.
 * @returns {Object} - An object containing the tracks grouped by popularity buckets.
 */
export const createBuckets = (tracks) => {
    const buckets = {
        "0-20": [],
        "21-40": [],
        "41-60": [],
        "61-80": [],
        "81-100": [],
    };

    tracks.forEach((t) => {
        const p = t.popularity;
        if (p <= 20) buckets["0-20"].push(t);
        else if (p <= 40) buckets["21-40"].push(t);
        else if (p <= 60) buckets["41-60"].push(t);
        else if (p <= 80) buckets["61-80"].push(t);
        else buckets["81-100"].push(t);
    });

    return buckets;
};

/**
 * Calculates the average value of a specified metric for each popularity bucket.
 * 
 * @param {Object} buckets - The object containing tracks grouped by popularity buckets.
 * @param {string} metric - The metric for which to calculate averages.
 * @returns {{ labels: string[], values: number[] }} - An object containing the labels and average values for each bucket.
 */
export const calculateAverages = (buckets, metric) => {
    const labels = Object.keys(buckets);

    const values = labels.map((key) => {
        const arr = buckets[key];
        if (!arr.length) return 0;

        return arr.reduce((sum, t) => sum + (t[metric] || 0), 0) / arr.length;
    });

    return { labels, values };
};