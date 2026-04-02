import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function ChartView({ tracks }) {
  const data = {
    datasets: [
      {
        label: "Energy vs Tempo",
        data: tracks.map((t) => ({
          x: t.tempo,
          y: t.energy,
        })),
      },
    ],
  };

  return (
    <div>
      <h3>Visualization</h3>
      <Scatter data={data} />
    </div>
  );
}