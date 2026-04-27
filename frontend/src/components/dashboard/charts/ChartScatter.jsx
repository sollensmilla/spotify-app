import { Scatter } from "react-chartjs-2";

/**
 * Renders a scatter chart using Chart.js.
 * @param {{ data: Array, options: Object }} param0 - The props object containing chart data and options.
 * @returns {JSX.Element} - The rendered ChartScatter component.
 */
export default function ChartScatter({ data, options }) {
  return <Scatter data={data} options={options} />;
}