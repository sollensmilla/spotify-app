import { useState, useEffect } from "react";
import { fetchTracks } from "../services/api";
import Filters from "../components/Filters";
import TrackList from "../components/TrackList";

export default function Dashboard() {
const [filters, setFilters] = useState({
  energyMin: 0,
  energyMax: 1,
  tempoMin: 0,
  tempoMax: 300,
  danceabilityMin: 0,
  danceabilityMax: 1
});

  const [tracks, setTracks] = useState([]);

useEffect(() => {
  const loadData = async () => {
    try {
      const data = await fetchTracks(filters);
      console.log("Fetched tracks:", data);
      setTracks(data);
    } catch (err) {
      console.error("Error fetching tracks:", err);
    }
  };
  loadData();
}, [filters]);

  return (
    <div>
      <h1>Find your vibe</h1>

      <Filters filters={filters} setFilters={setFilters} />
      <p>Current Min Energy: {filters.energyMin}</p>
      <p>Current Max Energy: {filters.energyMax}</p>
      <TrackList tracks={tracks} />
    </div>
  );
}