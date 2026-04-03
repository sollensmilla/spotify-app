import { useState, useEffect } from "react";
import { fetchTracks } from "../services/trackService";
import Filters from "../components/Filters";
import TrackList from "../components/tracks/TrackList";
import InsightBox from "../components/InsightBox";
import ChartView from "../components/charts/ChartView";

export default function Dashboard() {
const [filters, setFilters] = useState({
  energyMin: 0,
  energyMax: 1,
  tempoMin: 0,
  tempoMax: 300,
  danceabilityMin: 0,
  danceabilityMax: 1,
  popularityMin: 0,
  popularityMax: 100,
  acousticnessMin: 0,
  acousticnessMax: 1,
  explicit: null,
  genre: "",
  name: "",
  key: null
});

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTracks(filters).then(setTracks);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters]);

  return (
    <div>
      <h1>Find your vibe</h1>

      <Filters filters={filters} setFilters={setFilters} />

      <InsightBox tracks={tracks} />

      <ChartView tracks={tracks} />

      <TrackList tracks={tracks} />
    </div>
  );
}