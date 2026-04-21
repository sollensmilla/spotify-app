/**
 * PopularityBarChart: Renders a bar chart showing average values of a selected metric across popularity buckets.
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
 * Renders a bar chart showing average values of a selected metric across popularity buckets.
 * 
 * @param {{ labels: string[], values: number[], buckets: Object, metric: string, onBucketClick: Function }} param0 - The props object containing the labels for the x-axis, the average values for each bucket, the buckets of tracks, the currently selected metric, and a function to call when a bucket is clicked.
 * @returns {JSX.Element} - The rendered PopularityBarChart component.
 */
export default function PopularityBarChart({
  labels,
  values,
  buckets,
  metric,
  onBucketClick,
}) {
  const data = {
    labels,
    datasets: [
      {
        label: `Avg ${metric}`,
        data: values,
        backgroundColor: [
          "#4c78a8",
          "#72b7b2",
          "#f58518",
          "#e45756",
          "#54a24b",
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    onHover: (event, elements) => {
      const target = event?.native?.target;
      if (!target) return;
      target.style.cursor = elements.length ? "pointer" : "default";
    },

    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const key = labels[index];

            const count = buckets[key].length;
            const value = context.raw.toFixed(2);

            return `Avg: ${value} (${count} tracks) → click to explore`;
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

  return <Bar data={data} options={options} />;
}