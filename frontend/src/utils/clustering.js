import { kmeans } from 'ml-kmeans'

export function clusterTracks (tracks, k = 3) {
  if (!tracks?.length) return []

  const data = tracks.map((t) => [
    t.energy ?? 0,
    t.danceability ?? 0,
    (t.tempo ?? 0) / 200,
    t.acousticness ?? 0,
    t.instrumentalness ?? 0,
    (t.popularity ?? 0) / 100
  ])

  try {
    const result = kmeans(data, k, {
      initialization: 'kmeans++',
      maxIterations: 100
    })

    return tracks.map((track, i) => ({
      ...track,
      cluster: result.clusters[i]
    }))
  } catch (err) {
    console.error('KMeans failed:', err)

    return tracks.map((t) => ({
      ...t,
      cluster: 0
    }))
  }
}
