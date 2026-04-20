/**
 * PopularityChart: A React component that visualizes the average danceability and energy of tracks grouped by popularity buckets using a bar chart. Users can click on a bucket to drill down into the tracks within that bucket.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

/**
 * Renders a bar chart visualizing the average danceability and energy of tracks grouped by popularity buckets.
 * 
 * @param {*} param0 - The props object containing the list of tracks and a callback function for bucket clicks.
 * @returns {JSX.Element|null} - The rendered PopularityChart component or null if no tracks are provided.
 */
export default function PopularityChart({ tracks, onBucketClick }) {
  if (!tracks?.length) return null;

  const buckets = {
    "0-20": [],
    "21-40": [],
    "41-60": [],
    "61-80": [],
    "81-100": [],
  };

  tracks.forEach((t) => {
    const p = t.popularity;
    if (p <= 20) buckets["0-20"].push(t);
    else if (p <= 40) buckets["21-40"].push(t);
    else if (p <= 60) buckets["41-60"].push(t);
    else if (p <= 80) buckets["61-80"].push(t);
    else buckets["81-100"].push(t);
  });

  const labels = Object.keys(buckets);

  const avgDanceability = labels.map((key) => {
    const arr = buckets[key];
    if (!arr.length) return 0;

    return (
      arr.reduce((sum, t) => sum + t.danceability, 0) / arr.length
    );
  });

  const avgEnergy = labels.map((key) => {
  const arr = buckets[key];
  if (!arr.length) return 0;

  return (
    arr.reduce((sum, t) => sum + t.energy, 0) / arr.length
  );
});

const data = {
  labels,
  datasets: [
    {
      label: "Avg Danceability",
      data: avgDanceability,
      backgroundColor: labels.map((_, i) => {
        const colors = [
          "#4c78a8",
          "#72b7b2",
          "#f58518",
          "#e45756",
          "#54a24b",
        ];
        return colors[i];
      }),
      borderRadius: 8,
    },
    {
      label: "Avg Energy",
      data: avgEnergy,
      backgroundColor: labels.map((_, i) => {
        const colors = [
          "#a0c4ff",
          "#bdb2ff",
          "#ffc6ff",
          "#ffadad",
          "#caffbf",
        ];
        return colors[i];
      }),
      borderRadius: 8,
    },
  ],
};

  const options = {
    responsive: true,

      onHover: (event, elements) => {
    event.native.target.style.cursor = elements.length
      ? "pointer"
      : "default";
  },

    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const key = labels[index];

            const count = buckets[key].length;
            const value = context.raw.toFixed(2);

            return `Avg: ${value} (${count} tracks) → click to drill down`;
          },
        },
      },
    },

    onClick: (_, elements) => {
      if (!elements.length) return;

      const index = elements[0].index;
      const bucket = labels[index];

      onBucketClick?.(bucket);
    },
  };

  return (
    <div style={{ marginTop: "2rem" }}>
<h3>Danceability by Popularity (click a bar to explore)</h3>
      <Bar data={data} options={options} />
    </div>
  );
}