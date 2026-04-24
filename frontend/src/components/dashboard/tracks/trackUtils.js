/**
 * trackUtils: A utility module that provides functions for formatting track attributes, specifically the musical key. It includes a mapping of key values to their corresponding musical notes and a function to format the key value for display purposes.
 *
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

/**
 * A mapping of key values to their corresponding musical notes, including a special case for unknown keys.
 */
export const keyMap = {
  '-1': 'Unknown',
  0: 'C',
  1: 'C#/Db',
  2: 'D',
  3: 'D#/Eb',
  4: 'E',
  5: 'F',
  6: 'F#/Gb',
  7: 'G',
  8: 'G#/Ab',
  9: 'A',
  10: 'A#/Bb',
  11: 'B'
}

/**
 * Formats the musical key for display purposes.
 *
 * @param {number} key - The key value.
 * @returns {string} - The formatted key name.
 */
export const formatKey = (key) => keyMap[key] || 'Unknown'
