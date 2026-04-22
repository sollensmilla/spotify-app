/**
 * Analytics: A React page that fetches a large dataset of tracks.
 * 
 * @author Smilla Sollén
 */

import { useEffect, useState } from "react";
import { fetchAnalytics, fetchTracksPage } from "../services/trackService";
import PopularityChart from "../components/analytics/popularityChart/PopularityChart";
import TopLists from "../components/analytics/topLists/TopLists";

/**
 * Renders the Analytics page, which includes a popularity insights section
 * with an interactive bar chart and a top lists section.
 */
export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedBucket, setSelectedBucket] = useState(null);
  const [tracks, setTracks] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const pageSize = 10;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchAnalytics();
      setAnalytics(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <div>Loading analytics...</div>;

  /**
   * Load first page when clicking a bucket
   */
  const handleBucketClick = async (bucket) => {
    setSelectedBucket(bucket);
    setPage(1);

    const [min, max] = bucket.split("-").map(Number);
    const offset = 0;

    const pageData = await fetchTracksPage(
      {
        minPopularity: min,
        maxPopularity: max,
      },
      pageSize,
      offset
    );

    setTracks(pageData.items);
    setTotal(pageData.total);
  };

  /**
   * Pagination handler
   */
  const handlePageChange = async (newPage) => {
    setPage(newPage);

    const [min, max] = selectedBucket.split("-").map(Number);
    const offset = (newPage - 1) * pageSize;

    const pageData = await fetchTracksPage(
      {
        minPopularity: min,
        maxPopularity: max,
      },
      pageSize,
      offset
    );

    setTracks(pageData.items);
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Analytics</h1>

      <PopularityChart
        buckets={analytics.popularityBuckets}
        onBucketClick={handleBucketClick}
      />

      {selectedBucket && (
        <div style={{ marginTop: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Tracks in {selectedBucket}</h3>

            <button onClick={() => setSelectedBucket(null)}>
              Clear
            </button>
          </div>

          {tracks.map((t) => (
            <div key={t.id}>
              {t.track_name} — {t.popularity}
            </div>
          ))}

          <div style={{ marginTop: "1rem" }}>
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Prev
            </button>

            <span style={{ margin: "0 10px" }}>
              Page {page} / {totalPages || 1}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <TopLists topTracks={analytics.topTracks} />
    </div>
  );
}