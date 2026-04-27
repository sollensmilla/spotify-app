/**
 * Determines the vibe of a cluster based on its average track attributes.
 * @param {Object} param0 - The average attributes of the cluster.
 * @param {number} param0.avgEnergy - The average energy of tracks in the cluster.
 * @param {number} param0.avgTempo - The average tempo of tracks in the cluster.
 * @returns {Object} - The vibe description for the cluster.
 */
export function getClusterVibe ({
  avgEnergy,
  avgTempo,
  avgAcousticness,
  avgInstrumentalness,
  avgDanceability
}) {
  if (avgInstrumentalness > 0.6) {
    if (avgEnergy < 0.5) {
      return {
        label: '🎹 Ambient instrumental',
        description: 'Soft, atmospheric and mostly instrumental'
      }
    }

    return {
      label: '🎼 Energetic instrumental',
      description: 'Driving tracks without vocals'
    }
  }

  if (avgAcousticness > 0.65) {
    if (avgEnergy < 0.5) {
      return {
        label: '🌿 Acoustic chill',
        description: 'Organic, soft and relaxed'
      }
    }

    return {
      label: '🎸 Acoustic energy',
      description: 'Lively but still organic and raw'
    }
  }

  if (avgEnergy > 0.8 && avgTempo > 135) {
    return {
      label: '🚀 Festival banger',
      description: 'Explosive, fast and high energy'
    }
  }

  if (avgEnergy > 0.7 && avgDanceability > 0.7) {
    return {
      label: '💃 Dancefloor ready',
      description: 'Groovy, energetic and made for dancing'
    }
  }

  if (avgEnergy > 0.6 && avgTempo > 110) {
    return {
      label: '⚡ Energetic groove',
      description: 'Upbeat and driving'
    }
  }

  if (avgEnergy > 0.5 && avgTempo < 100) {
    return {
      label: '🚶 Chill groove',
      description: 'Laid-back but rhythmic'
    }
  }

  if (avgEnergy < 0.35 && avgTempo < 90) {
    return {
      label: '🌙 Deep chill',
      description: 'Slow, calm and atmospheric'
    }
  }

  if (avgTempo > 150) {
    return {
      label: '⚡ High tempo',
      description: 'Very fast-paced tracks'
    }
  }

  if (avgTempo < 85) {
    return {
      label: '🐢 Slow vibe',
      description: 'Mellow and unhurried'
    }
  }

  return {
    label: '🎧 Balanced vibe',
    description: 'A mix of styles and energy'
  }
}
