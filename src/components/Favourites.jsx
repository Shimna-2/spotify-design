import React from "react";
import { useSelector } from "react-redux";
import SongCard from "./SongCard"; // Assuming you have a SongCard component

const Favourites = () => {
  const favourites = useSelector((state) => state.songs.favourites); // Get favourites from Redux

  return (
    <div className="favourites">
      <h2>Favourites</h2>
      {favourites.length === 0 ? (
        <p style={{ color: "#bbb" }}>No favourite songs yet.</p>
      ) : (
        <div className="song-list">
          {favourites.map((song, index) => (
            <SongCard key={index} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
