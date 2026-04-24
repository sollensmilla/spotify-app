/**
 * filterUtils: Utility functions and constants for managing filters in the dashboard, including key options for musical keys and a function to handle changes in range filters.
 *
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * An array of options for musical keys, used in select filters to allow users to filter tracks by key.
 */
export const keyOptions = [
  { value: -1, label: 'Unknown' },
  { value: 0, label: 'C' },
  { value: 1, label: 'C#/Db' },
  { value: 2, label: 'D' },
  { value: 3, label: 'D#/Eb' },
  { value: 4, label: 'E' },
  { value: 5, label: 'F' },
  { value: 6, label: 'F#/Gb' },
  { value: 7, label: 'G' },
  { value: 8, label: 'G#/Ab' },
  { value: 9, label: 'A' },
  { value: 10, label: 'A#/Bb' },
  { value: 11, label: 'B' }
]

/**
 * Handles changes to range filters, updating the filter values in the state.
 *
 * @param {*} setFilters
 * @param {*} minKey
 * @param {*} maxKey
 * @param {*} value
 */
export const handleRangeChange = (setFilters, minKey, maxKey, value) => {
  setFilters((prev) => ({
    ...prev,
    [minKey]: value[0],
    [maxKey]: value[1]
  }))
}
