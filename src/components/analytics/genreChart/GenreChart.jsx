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
import { getGenreCounts } from "./genreChartUtils";

export default function GenreChart({ tracks }) {
  if (!tracks.length) return null;

  const counts = getGenreCounts(tracks);

  const labels = Object.keys(counts);
  const dataValues = Object.values(counts);

  const data = {
    labels,
    datasets: [
      {
        label: "Tracks per genre",
        data: dataValues,
      },
    ],
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Genre Distribution</h3>
      <Bar data={data} />
    </div>
  );
}