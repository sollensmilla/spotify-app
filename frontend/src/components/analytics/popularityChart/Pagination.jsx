/**
 * Component for rendering pagination controls in the popularity chart section of the analytics page.
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * Renders a pagination component for navigating between pages.
 * 
 * @param {{ page: number, totalPages: number, onPageChange: Function }} param0 - The props for the component, including current page, total pages, and page change handler.
 * @returns {JSX.Element} - The rendered Pagination component.
 */
export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page} / {totalPages || 1}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}