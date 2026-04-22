/**
 * Custom hook to manage fetching and state of tracks based on selected popularity buckets. It provides functionality to select a bucket, load tracks for that bucket, and handle pagination.
 * 
 * @author Smilla Sollén
 */

import { useState } from "react";
import { fetchTracksPage } from "../services/trackService";

/**
 * Parses a bucket string into min and max values.
 * @param {string} bucket - The bucket string (e.g., "21-40").
 * @returns {Object|null} - An object with min and max properties, or null if invalid.
 */
const parseBucket = (bucket) => {
  if (!bucket) return null;
  const [min, max] = bucket.split("-").map(Number);
  return { min, max };
};

/**
 * Custom hook to manage fetching and state of tracks based on selected popularity buckets.
 * @param {number} pageSize - The number of tracks to display per page.
 * @returns {Object} - An object containing the hook's state and methods.
 */
export function useBucketTracks(pageSize = 10) {
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadTracks = async (bucket, pageNum = 1) => {
    const parsed = parseBucket(bucket);
    if (!parsed) return;

    const { min, max } = parsed;

    const offset = (pageNum - 1) * pageSize;

    const data = await fetchTracksPage(
      { minPopularity: min, maxPopularity: max },
      pageSize,
      offset
    );

    setTracks(data.items);
    setTotal(data.total);
  };

  const selectBucket = async (bucket) => {
    setSelectedBucket(bucket);
    setPage(1);
    await loadTracks(bucket, 1);
  };

  const changePage = async (newPage) => {
    if (!selectedBucket) return;
    setPage(newPage);
    await loadTracks(selectedBucket, newPage);
  };

  return {
    selectedBucket,
    tracks,
    page,
    total,
    selectBucket,
    changePage,
    clear: () => setSelectedBucket(null),
  };
}