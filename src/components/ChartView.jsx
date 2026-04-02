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
  if (!tracks.length) return null;

  const avgTempo =
    tracks.reduce((sum, t) => sum + t.tempo, 0) / tracks.length;

  const avgEnergy =
    tracks.reduce((sum, t) => sum + t.energy, 0) / tracks.length;

  const data = {
    datasets: [
      {
        label: "Tracks",
        data: tracks.map((t) => ({
          x: t.tempo,
          y: t.energy,
        })),

        pointBackgroundColor: tracks.map((t) =>
          t.energy > 0.7
            ? "red"
            : t.energy > 0.4
            ? "orange"
            : "blue"
        ),

pointRadius: tracks.map((t) => t.popularity / 20),
      },

      {
        label: "Average",
        data: [{ x: avgTempo, y: avgEnergy }],
        pointRadius: 8,
        pointBackgroundColor: "black",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Tempo (BPM)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Energy",
        },
        min: 0,
        max: 1,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const track = tracks[context.dataIndex];

            if (!track) {
              return `Average — ${avgTempo.toFixed(
                0
              )} BPM, Energy: ${avgEnergy.toFixed(2)}`;
            }

            return `${track.track_name} — ${track.tempo} BPM, Energy: ${track.energy}`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Visualization</h3>
      <Scatter data={data} options={options} />
    </div>
  );
}