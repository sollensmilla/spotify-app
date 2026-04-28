/**
 * Custom React hook for fetching and managing tracks based on popularity buckets.
 *
 * @author Smilla Sollén
 */

import { useState, useRef } from 'react'
import { fetchTracksPage } from '../services/trackService'

/**
 * Parses a bucket string (e.g. "21-40") into numeric min/max values.
 *
 * @param {string} bucket - The bucket string to parse.
 * @returns {{min: number, max: number} | null} Parsed range or null if invalid.
 */
const parseBucket = (bucket) => {
  if (!bucket) return null

  // Expecting format "min-max"
  const [min, max] = bucket.split('-').map(Number)
  if (isNaN(min) || isNaN(max)) return null

  return { min, max }
}

/**
 * Validates the API response structure.
 *
 * @param {object} data - The API response.
 * @throws {Error} If the response format is invalid.
 */
const validateResponse = (data) => {
  if (!data || !Array.isArray(data.items)) {
    throw new Error('Ogiltigt svar från servern')
  }
}

/**
 * Custom React hook for managing track fetching based on popularity buckets.
 * Handles pagination, loading state, error handling, and race conditions.
 *
 * @param {number} [pageSize=10] - Number of tracks per page.
 * @returns {{
 * selectedBucket: string|null,
 * tracks: Array,
 * page: number,
 * total: number,
 * loading: boolean,
 * error: string|null,
 * selectBucket: (bucket: string) => Promise<void>,
 * changePage: (page: number) => Promise<void>,
 * clear: () => void
 * }} - The hook's state and action handlers.
 */
export function useBucketTracks(pageSize = 10) {
  const [selectedBucket, setSelectedBucket] = useState(null)
  const [tracks, setTracks] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const requestIdRef = useRef(0)

  /**
   * Safely fetches a page of tracks for a given bucket.
   *
   * @param {string} bucket - The bucket string (e.g. "21-40").
   * @param {number} pageNum - The page number to fetch.
   * @returns {Promise<{items: Array, total: number}>} - The fetched tracks and total count.
   * @throws {Error} If bucket is invalid or API response fails validation.
   */
  const safeFetch = async (bucket, pageNum) => {
    const parsed = parseBucket(bucket)
    if (!parsed) throw new Error('Ogiltig bucket')

    const { min, max } = parsed
    const offset = (pageNum - 1) * pageSize

    const data = await fetchTracksPage(
      { popularityMin: min, popularityMax: max },
      pageSize,
      offset
    )

    validateResponse(data)

    return data
  }

  /**
   * Loads tracks and updates state with proper error and loading handling.
   * Prevents race conditions by ignoring outdated requests.
   *
   * @param {string} bucket - The selected bucket.
   * @param {number} [pageNum=1] - Page number to load.
   */
  const loadTracks = async (bucket, pageNum = 1) => {
    const requestId = ++requestIdRef.current

    setLoading(true)
    setError(null)

    try {
      const data = await safeFetch(bucket, pageNum)

      if (requestId !== requestIdRef.current) return

      setTracks(data.items)
      setTotal(data.total ?? 0)
    } catch (err) {
      if (requestId !== requestIdRef.current) return

      console.error(err)
      setError(err.message)
      setTracks([])
      setTotal(0)
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false)
      }
    }
  }

  /**
   * Selects a new bucket and loads its first page.
   *
   * @param {string} bucket - The bucket to select.
   */
  const selectBucket = async (bucket) => {
    setSelectedBucket(bucket)
    setPage(1)
    await loadTracks(bucket, 1)
  }

  /**
   * Changes the current page within the selected bucket.
   *
   * @param {number} newPage - The page number to load.
   */
  const changePage = async (newPage) => {
    if (!selectedBucket) return

    setPage(newPage)
    await loadTracks(selectedBucket, newPage)
  }

  /**
   * Clears the current selection and resets state.
   */
  const clear = () => {
    setSelectedBucket(null)
    setTracks([])
    setTotal(0)
    setError(null)
  }

  return {
    selectedBucket,
    tracks,
    page,
    total,
    loading,
    error,
    selectBucket,
    changePage,
    clear
  }
}
