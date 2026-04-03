import { Scatter } from "react-chartjs-2";

export default function ChartScatter({ data, options }) {
  return <Scatter data={data} options={options} />;
}