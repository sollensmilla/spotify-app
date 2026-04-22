/**
 * Dashboard: A React page that serves as the main interface for users to explore and filter music tracks based on various attributes. It fetches track data from the backend based on the applied filters and handles loading and error states accordingly.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import { useState, useEffect } from "react";
import { fetchTracksPage } from "../services/trackService";
import Filters from "../components/dashboard/filters/Filters";
import TrackList from "../components/dashboard/tracks/TrackList";
import InsightBox from "../components/dashboard/insight/InsightBox";
import ChartView from "../components/dashboard/charts/ChartView";

/**
 * Renders the Dashboard page.
 * @param {{ token: string }} param0 - The props object containing the authentication token.
 * @returns {JSX.Element} - The rendered Dashboard component.
 */
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
    minInstrumentalness: 0,
    maxInstrumentalness: 1,
    explicit: null,
    genre: "",
    name: "",
    key: null
  });

  const [tracks, setTracks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const limit = 25;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTracks = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTracksPage(
        filters,
        limit,
        (page - 1) * limit
      );

      setTracks(data.items);
      setTotal(data.total);
    } catch (err) {
      setError("Failed to load tracks");
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  // debounce filters
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadTracks();
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters, page, token]);

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  if (loading) return <div>Loading tracks...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Find your vibe
        </h1>

        <div style={{ display: "flex", gap: "2rem" }}>
          <Filters filters={filters} setFilters={setFilters} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <TrackList
  tracks={tracks}
  page={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>

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