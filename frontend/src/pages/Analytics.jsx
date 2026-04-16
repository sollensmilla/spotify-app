import { useEffect, useState } from "react";
import { fetchTracks } from "../services/trackService";

import TopLists from "../components/analytics/topLists/TopLists";
import GenreChart from "../components/analytics/genreChart/GenreChart";

export default function AnalyticsView() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchTracks({}).then(setTracks);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Analytics
      </h1>

      <TopLists tracks={tracks} />
      <div style={{ marginTop: "2rem" }}>
        <GenreChart tracks={tracks} />
      </div>
    </div>
  );
}