/**
 * PopularityChart: Main component for the popularity insights section.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import { useState } from "react";
import MetricSelector from "./MetricSelector";
import PopularityBarChart from "./PopularityBarChart";

/**
 * Renders the main popularity insights section, allowing users to select an audio feature and view its average values across popularity buckets in a bar chart.
 * 
 * @param {{ buckets: any[], onBucketClick: Function }} param0 - The props for the component, including popularity buckets and a click handler for when a bucket is clicked.
 * @returns {JSX.Element} - The rendered PopularityChart component.
 */
export default function PopularityChart({ buckets, onBucketClick }) {
  const [metric, setMetric] = useState("avg_danceability");

  const metricLabels = {
    avg_danceability: "Danceability",
    avg_energy: "Energy",
    avg_tempo: "Tempo",
    avg_acousticness: "Acousticness",
    avg_instrumentalness: "Instrumentalness",
  };

  if (!buckets?.length) return null;

  const labels = buckets.map((b) => b.bucket);
  const values = buckets.map((b) => b[metric] || 0);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>
        Popularity Insights – Avg {metricLabels[metric]}
      </h3>

      <MetricSelector metric={metric} setMetric={setMetric} />

      <PopularityBarChart
        labels={labels}
        values={values}
        buckets={buckets}
        metric={metric}
        onBucketClick={onBucketClick}
      />
    </div>
  );
}