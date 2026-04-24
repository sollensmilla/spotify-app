/**
 * TopListsPage: A page component that fetches and displays the user's top tracks and artists.
 */

import { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/trackService";
import TopTracks from "../components/topLists/TopTracks";
import TopArtists from "../components/topLists/TopArtists";

/**
 * Renders the TopLists page, which displays the user's top tracks and artists.
 * 
 * @returns {JSX.Element} - The rendered TopLists page.
 */
export default function TopListsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchAnalytics();
      setData(res);
    };
    load();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
<div
  style={{
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap"
  }}
>
  <TopTracks topTracks={data.topTracks} />
  <TopArtists topArtists={data.topArtists} />
</div>
  );
}