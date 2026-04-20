/**
 * Analytics: A React page using functional components and hooks to fetch and display analytics data related to music tracks.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import { useEffect, useState } from "react";
import { fetchAnalytics, fetchTracks } from "../services/trackService";
import GenreChart from "../components/analytics/genreChart/GenreChart";
import TopLists from "../components/analytics/topLists/TopLists";

/**
 * Renders the Analytics page.
 * 
 * @param {{ token: string }} param0 - The props object containing the authentication token.
 * @returns {JSX.Element} - The rendered Analytics component.
 */
export default function Analytics({ token }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreTracks, setGenreTracks] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchAnalytics(token);
        setData(res);
      } catch (err) {
        console.error(err); 
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  useEffect(() => {
    const loadGenreTracks = async () => {
      if (!selectedGenre) return;

      const res = await fetchTracks({
        genre: selectedGenre,
      });

      setGenreTracks(res);
    };

    loadGenreTracks();
  }, [selectedGenre]);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!data) return null;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Analytics</h1>

      <GenreChart
        genreCounts={data.genreCounts}
        onGenreClick={setSelectedGenre}
      />

      <TopLists topTracks={data.topTracks} />

      {selectedGenre && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Tracks in {selectedGenre}</h3>

          {genreTracks.map((t) => (
            <div key={t.id}>
              {t.track_name} ({t.popularity})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}