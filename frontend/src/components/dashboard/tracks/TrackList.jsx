/**
 * TrackList: A React component that renders a list of tracks in a table format. It displays the track's title, genre, energy, danceability, tempo, key, popularity, acousticness, and explicit content status. The component handles cases where no tracks are found and uses the TrackItem component to render each individual track's information in a table row.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import TrackItem from "./TrackItem";

/**
 * Renders a list of tracks in a table format.
 * @param {{ tracks: Array }} param0 - The props object containing the list of tracks.
 * @returns {JSX.Element} - The rendered TrackList component.
 */
export default function TrackList({ tracks }) {
 if (!tracks || tracks.length === 0) {
  return <div>No tracks found</div>;
}

  return (
   <div className="rounded-2xl shadow-md border border-gray-100 bg-white h-full flex flex-col">
      
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          Tracks
        </h3>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[850px] overflow-y-auto">

          <table className="min-w-[900px] w-full text-sm text-left">
            
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-xs uppercase text-gray-500 tracking-wide">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Genre</th>
                <th className="px-4 py-3">Energy</th>
                <th className="px-4 py-3">Dance</th>
                <th className="px-4 py-3">Tempo</th>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Pop</th>
                <th className="px-4 py-3">Acoustic</th>
                <th className="px-4 py-3">Instrumental</th>
                <th className="px-4 py-3">Explicit</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {tracks.filter(Boolean).map((track) => (
                <TrackItem key={track.id} track={track} />
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}