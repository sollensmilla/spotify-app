/**
 * Spinner: A React component that renders a loading spinner, typically used to indicate that data is being loaded or a process is ongoing.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * Renders a loading spinner.
 * @returns {JSX.Element} - The rendered Spinner component.
 */
export default function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}