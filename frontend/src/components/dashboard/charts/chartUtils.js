export const calculateAverages = (tracks) => {
    const avgTempo =
        tracks.reduce((sum, t) => sum + t.tempo, 0) / tracks.length;

    const avgEnergy =
        tracks.reduce((sum, t) => sum + t.energy, 0) / tracks.length;

    return { avgTempo, avgEnergy };
};