/**
 * ChartScatter: A React component that renders a scatter chart using Chart.js, allowing for visualization of data points in a two-dimensional space.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import { Scatter } from "react-chartjs-2";

/**
 * Renders a scatter chart using Chart.js.
 * @param {{ data: Array, options: Object }} param0 - The props object containing chart data and options.
 * @returns {JSX.Element} - The rendered ChartScatter component.
 */
export default function ChartScatter({ data, options }) {
  return <Scatter data={data} options={options} />;
}