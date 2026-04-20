import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

import { Bar } from "react-chartjs-2";

export default function GenreChart({ genreCounts, onGenreClick }) {
  if (!genreCounts?.length) return null;

  const data = {
    labels: genreCounts.map((g) => g.genre),
    datasets: [
      {
        label: "Tracks per genre",
        data: genreCounts.map((g) => g.count),
      },
    ],
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Genre Distribution</h3>

      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
          onClick: (_, elements) => {
            if (!elements.length) return;

            const index = elements[0].index;
            const genre = data.labels[index];

            onGenreClick?.(genre); 
          },
        }}
      />
    </div>
  );
}