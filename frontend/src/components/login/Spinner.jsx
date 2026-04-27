/**
 * Renders a loading spinner.
 * @returns {JSX.Element} - The rendered Spinner component.
 */
export default function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}