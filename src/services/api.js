import axios from "axios";

const API_URL = "/graphql";

export const fetchTracks = async (filters) => { // <-- tar filters som argument
    const query = `
query GetTracks($filter: TrackFilterInput, $limit: Int) {
  tracks(filter: $filter, limit: $limit) {
    items {
      id
      track_name
      energy
      tempo
      danceability
    }
  }
}
`;

    const variables = {
        limit: 5,
        filter: {
            minEnergy: filters.energyMin,
            maxEnergy: filters.energyMax,
            minTempo: filters.tempoMin,
            maxTempo: filters.tempoMax,
            minDanceability: filters.danceabilityMin,
            maxDanceability: filters.danceabilityMax
        }
    };

    try {
        const res = await axios.post(API_URL, { query, variables });
        console.log("Fetched tracks:", res.data);
        return res.data.data.tracks.items;
    } catch (err) {
        console.error("Error fetching tracks:", err.response?.data || err);
        return [];
    }
};