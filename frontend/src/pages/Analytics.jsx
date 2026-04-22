/**
 * Analytics: A React page that fetches a large dataset of tracks.
 * 
 * @author Smilla Sollén
 */

import { useEffect, useState } from "react";
import { fetchAnalytics, fetchTracksPage } from "../services/trackService";
import PopularityChart from "../components/analytics/popularityChart/PopularityChart";
import TopLists from "../components/analytics/topLists/TopLists";
import Pagination from "../components/analytics/popularityChart/Pagination";

/**
 * Helper: parse bucket string like "21-40"
 */
const parseBucket = (bucket) => {
  if (!bucket) return null;
  const [min, max] = bucket.split("-").map(Number);
  return { min, max };
};

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

    const parsed = parseBucket(bucket);
    if (!parsed) return;

    const { min, max } = parsed;

    const pageData = await fetchTracksPage(
      {
        minPopularity: min,
        maxPopularity: max,
      },
      pageSize,
      0
    );

    setTracks(pageData.items);
    setTotal(pageData.total);
  };

  /**
   * Pagination handler
   */
  const handlePageChange = async (newPage) => {
    if (!selectedBucket) return;

    setPage(newPage);

    const parsed = parseBucket(selectedBucket);
    if (!parsed) return;

    const { min, max } = parsed;

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

          <Pagination
            page={page}
            totalPages={totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <TopLists topTracks={analytics.topTracks} />
    </div>
  );
}