/**
 * Analytics: A React page that fetches a large dataset of tracks.
 * 
 * @author Smilla Sollén
 */

import { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/trackService";
import PopularityChart from "../components/analytics/popularityChart/PopularityChart";
import Pagination from "../components/pagination/Pagination";
import { useBucketTracks } from "../hooks/useBucketTracks";

/**
 * Renders the Analytics page, which includes a popularity insights section
 * with an interactive bar chart and a top lists section.
 */
export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    selectedBucket,
    tracks,
    page,
    total,
    selectBucket,
    changePage,
    clear,
  } = useBucketTracks(10);

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

  const totalPages = Math.ceil(total / 10);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Analytics</h1>

      <p style={{ maxWidth: "700px", marginBottom: "1rem", color: "#555" }}>
  Explore how different track attributes relate to popularity. You can filter
  tracks by various attributes and view how they are grouped into popularity
  buckets. Each bar shows the average values for that group. Click on a bar to
  see all tracks included in that bucket.
</p>

      <PopularityChart
        buckets={analytics.popularityBuckets}
        onBucketClick={selectBucket}
      />

      {selectedBucket && (
        <div style={{ marginTop: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Tracks in {selectedBucket}</h3>

            <button onClick={clear}>
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
            onPageChange={changePage}
          />
        </div>
      )}
    </div>
  );
}