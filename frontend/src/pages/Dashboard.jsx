import { useState, useEffect } from "react";
import { fetchTracks } from "../services/trackService";
import Filters from "../components/dashboard/filters/Filters";
import TrackList from "../components/dashboard/tracks/TrackList";
import InsightBox from "../components/dashboard/insight/InsightBox";
import ChartView from "../components/dashboard/charts/ChartView";

export default function Dashboard({ token }) {
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
      fetchTracks(filters, token).then(setTracks);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters, token]);

  return (
    <div style={{ padding: "2rem" }}>
      
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Find your vibe
        </h1>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "stretch"
          }}
        >
            <div style={{ flex: 1, display: "flex" }}>
    <div style={{ flex: 1 }}>
      <Filters filters={filters} setFilters={setFilters} />
    </div>
  </div>

  <div style={{ flex: 2, display: "flex" }}>
    <div style={{ flex: 1, maxWidth: "800px" }}>
      <TrackList tracks={tracks} />
    </div>
  </div>
</div>

        <div style={{ marginTop: "2rem" }}>
          <InsightBox tracks={tracks} />
        </div>

        <div style={{ marginTop: "2rem" }}>
          <ChartView tracks={tracks} />
        </div>

      </div>
    </div>
  );
}