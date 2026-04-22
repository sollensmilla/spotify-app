/**
 * Analytics: A React page that fetches a large dataset of tracks.
 * 
 * @author Smilla Sollén
 */

import { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/trackService";
import PopularityChart from "../components/analytics/popularityChart/PopularityChart";
import TopLists from "../components/analytics/topLists/TopLists";
import Pagination from "../components/analytics/popularityChart/Pagination";
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

      <TopLists topTracks={analytics.topTracks} />
    </div>
  );
}