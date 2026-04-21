/**
 * Analytics: A React page that fetches a large dataset of tracks
 * and visualizes aggregated insights using charts.
 * 
 * Features:
 * - Fetches a large dataset for analytics (aggregation-friendly)
 * - Displays an interactive chart grouped by popularity
 * - Supports drill-down by clicking chart buckets
 * - Shows a filtered subset of tracks for deeper inspection
 * - Displays a top list of popular tracks
 * 
 * @author Smilla Sollén
 */

import { useEffect, useState } from "react";
import { fetchAnalyticsTracks } from "../services/trackService";
import PopularityChart from "../components/analytics/popularityChart/PopularityChart";
import TopLists from "../components/analytics/topLists/TopLists";

export default function Analytics() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBucket, setSelectedBucket] = useState(null);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const res = await fetchAnalyticsTracks();
        setTracks(res);
      } catch (err) {
        console.error("Failed to load analytics tracks:", err);
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div>Loading analytics...</div>;

  const filteredTracks = selectedBucket
    ? tracks.filter((t) => {
        const p = t.popularity;

        if (selectedBucket === "0-20") return p <= 20;
        if (selectedBucket === "21-40") return p <= 40 && p > 20;
        if (selectedBucket === "41-60") return p <= 60 && p > 40;
        if (selectedBucket === "61-80") return p <= 80 && p > 60;
        if (selectedBucket === "81-100") return p > 80;

        return true;
      })
    : [];

  const totalPages = Math.ceil(filteredTracks.length / pageSize);

  const paginatedTracks = filteredTracks.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleBucketClick = (bucket) => {
    setSelectedBucket(bucket);
    setPage(1);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Analytics</h1>

      <p style={{ color: "#666", marginBottom: "1rem" }}>
        Explore how audio features change with popularity.
      </p>

      <PopularityChart
        tracks={tracks}
        onBucketClick={handleBucketClick}
      />

      {selectedBucket && (
        <div style={{ marginTop: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Tracks in {selectedBucket}</h3>

            <button
              onClick={() => setSelectedBucket(null)}
              style={{
                border: "none",
                background: "#eee",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>

          {filteredTracks.length === 0 ? (
            <p>No tracks found.</p>
          ) : (
            <>
              {paginatedTracks.map((t) => (
                <div key={t.id}>
                  {t.track_name} — {t.popularity}
                </div>
              ))}

              <div style={{ marginTop: "1rem" }}>
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </button>

                <span style={{ margin: "0 10px" }}>
                  Page {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <TopLists topTracks={tracks} />
    </div>
  );
}