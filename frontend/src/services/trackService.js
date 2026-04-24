/**
 * Track Service: Handles fetching tracks and analytics data from the backend GraphQL API.
 *
 * @author Smilla Sollén
 */

import apiClient from './apiClient'

/**
 * Fetches tracks based on the provided filters.
 * Used in Dashboard (small dataset for performance).
 *
 * @param {object} filters - The filter criteria for fetching tracks.
 * @returns {Promise<Array>} - An array of track objects matching the filters.
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
          instrumentalness
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
  `

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
      minInstrumentalness: filters.instrumentalnessMin,
      maxInstrumentalness: filters.instrumentalnessMax,

      ...(filters.explicit !== null && { explicit: filters.explicit }),
      ...(filters.genre && { genre: filters.genre }),
      ...(filters.name && { name: filters.name }),
      ...(filters.key !== null && filters.key !== undefined
        ? { key: filters.key }
        : {})
    }
  }

  try {
    const res = await apiClient.post('', { query, variables })
    return res.data.data.tracks.items
  } catch (err) {
    console.error('Error fetching tracks:', err.response?.data || err)
    return []
  }
}

/**
 * Fetches precomputed analytics (top tracks, artists, etc.)
 * Optional helper for analytics page.
 *
 * @returns {Promise<object>} - The fetched analytics data.
 */
export const fetchAnalytics = async () => {
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
          artists { artist_name }
          albums { album_name }
        }
        topArtists {
          artist_name
          count
          average_popularity
        }
        popularityBuckets {
          bucket
          avg_danceability
          avg_energy
          avg_tempo
          avg_acousticness
          avg_instrumentalness
          count
        }
      }
    }
  `

  try {
    const res = await apiClient.post('', { query })
    return res.data.data.analytics
  } catch (err) {
    console.error('Error fetching analytics:', err.response?.data || err)
    return null
  }
}

export const fetchTracksPage = async (filters = {}, limit = 25, offset = 0) => {
  const query = `
    query GetTracks($filter: TrackFilterInput, $limit: Int, $offset: Int) {
      tracks(filter: $filter, limit: $limit, offset: $offset) {
        total
        limit
        offset
        items {
          id
          track_name
          energy
          tempo
          danceability
          key
          popularity
          acousticness
          instrumentalness
          explicit
          track_genre
          artists { artist_name }
          albums { album_name }
          image_url
        }
      }
    }
  `

  const variables = {
    limit,
    offset,
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
    minInstrumentalness: filters.instrumentalnessMin,
    maxInstrumentalness: filters.instrumentalnessMax,
      ...(filters.explicit !== null && { explicit: filters.explicit }),
      ...(filters.genre && { genre: filters.genre }),
      ...(filters.name && { name: filters.name }),
      ...(filters.key !== null && filters.key !== undefined ? { key: filters.key } : {})
    }
  }

const res = await apiClient.post('', { query, variables })

return res.data.data.tracks
}
