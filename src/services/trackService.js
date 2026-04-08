import apiClient from "./apiClient";

export const fetchTracks = async (filters) => {
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