import { useEffect, useState } from "react";
import { fetchAnalyticsTracks } from "../services/trackService";
import PopularityChart from "../components/analytics/popularityChart/PopularityChart";
import TopLists from "../components/analytics/topLists/TopLists";

export default function Analytics() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBucket, setSelectedBucket] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetchAnalyticsTracks();
      setTracks(res);
      setLoading(false);
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
    : tracks;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Analytics</h1>

      <PopularityChart
        tracks={tracks}
        onBucketClick={setSelectedBucket}
      />

      {selectedBucket && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Tracks in {selectedBucket}</h3>

          {filteredTracks.slice(0, 10).map((t) => (
            <div key={t.id}>
              {t.track_name} — {t.popularity}
            </div>
          ))}
        </div>
      )}

      <TopLists topTracks={tracks} />
    </div>
  );
}