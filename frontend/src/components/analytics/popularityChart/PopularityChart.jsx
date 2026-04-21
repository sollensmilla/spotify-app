/**
 * PopularityChart: Main component for the popularity insights section. It manages the selected metric state, processes the tracks into buckets, and renders the MetricSelector and PopularityBarChart components.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import { useState } from "react";
import MetricSelector from "./MetricSelector";
import PopularityBarChart from "./PopularityBarChart";
import {
  createBuckets,
  calculateAverages,
} from "./popularityUtils";

/**
 * Main component for the popularity insights section.
 * 
 * @param {{ tracks: Object[], onBucketClick: Function }} param0 - The props object containing the list of tracks and a function to call when a bucket is clicked.
 * @returns {JSX.Element} - The rendered PopularityChart component.
 */
export default function PopularityChart({ tracks, onBucketClick }) {
  const [metric, setMetric] = useState("danceability");

  if (!tracks?.length) return null;

  const buckets = createBuckets(tracks);
  const { labels, values } = calculateAverages(buckets, metric);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Popularity Insights (click a bar to explore)</h3>

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