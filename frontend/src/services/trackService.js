/**
 * Track Service: Handles fetching tracks and analytics data from the backend GraphQL API.
 * 
 * @author Smilla Sollén
 */

import apiClient from "./apiClient";

/**
 * Fetches tracks based on the provided filters.
 * Used in Dashboard (small dataset for performance).
 * 
 * @param {Object} filters
 * @returns {Promise<Array>}
 */
export const fetchTracks = async (filters = {}) => {
  const query = `
    query GetTracks($filter: TrackFilterInput, $limit: Int) {
      tracks(filter: $filter, limit: $limit) {
        items {
          id
          track_name
          energy
          tempo
          danceability
          key
          popularity
          acousticness
          explicit
          track_genre
          artists {
            artist_name
          }
          albums {
            album_name
          }
          image_url
        }
      }
    }
  `;

  const variables = {
    limit: 25,
    filter: {
      minEnergy: filters.energyMin,
      maxEnergy: filters.energyMax,
      minTempo: filters.tempoMin,
      maxTempo: filters.tempoMax,
      minDanceability: filters.danceabilityMin,
      maxDanceability: filters.danceabilityMax,
      minPopularity: filters.popularityMin,
      maxPopularity: filters.popularityMax,
      minAcousticness: filters.acousticnessMin,
      maxAcousticness: filters.acousticnessMax,

      ...(filters.explicit !== null && { explicit: filters.explicit }),
      ...(filters.genre && { genre: filters.genre }),
      ...(filters.name && { name: filters.name }),
      ...(filters.key !== null && filters.key !== undefined
        ? { key: filters.key }
        : {}),
    },
  };

  try {
    const res = await apiClient.post("", { query, variables });
    return res.data.data.tracks.items;
  } catch (err) {
    console.error("Error fetching tracks:", err.response?.data || err);
    return [];
  }
};

/**
 * Fetches a large dataset for analytics.
 * Used in Analytics page (aggregation + charts).
 * 
 * @returns {Promise<Array>}
 */
export const fetchAnalyticsTracks = async () => {
  const query = `
    query GetTracks($limit: Int) {
      tracks(limit: $limit) {
        items {
          id
          track_name
          energy
          tempo
          danceability
          popularity
        }
      }
    }
  `;

  const variables = {
    limit: 6000,
  };

  try {
    const res = await apiClient.post("", { query, variables });
    return res.data.data.tracks.items;
  } catch (err) {
    console.error("Error fetching analytics tracks:", err);
    return [];
  }
};

/**
 * Fetches precomputed analytics (top tracks, artists, etc.)
 * Optional helper for analytics page.
 * 
 * @param {string} token
 * @returns {Promise<Object>}
 */
export const fetchAnalytics = async (token) => {
  const query = `
    query {
      analytics {
        genreCounts {
          genre
          count
        }
        topTracks {
          id
          track_name
          popularity
          image_url
          artists {
            artist_name
          }
          albums {
            album_name
          }
        }
        topArtists {
          artist_name
          count
        }
      }
    }
  `;

  try {
    const res = await apiClient.post(
      "",
      { query },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data.data.analytics;
  } catch (err) {
    console.error("Error fetching analytics:", err);
    return null;
  }
};