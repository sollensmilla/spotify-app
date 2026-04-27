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
 * @param {{ labels: string[], values: number[], buckets: any[], metric: string, onBucketClick: Function }} param0 - The props for the component, including labels, values, buckets, selected metric, and click handler for buckets.
 * @returns {JSX.Element} - The rendered PopularityBarChart component.
 */
export default function PopularityBarChart({
  labels,
  values,
  buckets,
  metric,
  onBucketClick,
}) {
  const labelMap = {
    avg_danceability: "Danceability",
    avg_energy: "Energy",
    avg_tempo: "Tempo",
    avg_acousticness: "Acousticness",
    avg_instrumentalness: "Instrumentalness",
  };

  const data = {
    labels,
    datasets: [
      {
        label: `Avg ${labelMap[metric] || metric}`,

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
            const count = buckets[index].count;
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