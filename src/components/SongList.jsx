import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong, setRecentlyPlayed } from "../store/songsSlice";
import SongCard from "./SongCard";
import "./SongList.scss";
import SearchBar from "./SearchBar";

const SongList = ({ scrollToPlayer }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const songs = useSelector((state) => state.songs.allSongs) || [];
  const favourites = useSelector((state) => state.songs.favourites) || [];
  const recent = useSelector((state) => state.songs.recentlyPlayed) || [];
  const query = useSelector((state) => state.search.query) || "";
  const activeTab = useSelector((state) => state.ui.activeTab);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [activeTab, query]);

  const handlePlay = (song) => {
    dispatch(setCurrentSong(song));
    dispatch(setRecentlyPlayed(song));
    if (scrollToPlayer) scrollToPlayer();
  };

  // Determine the correct list of songs to display
  const displayedSongs =
    activeTab === "favourites"
      ? favourites
      : activeTab === "recent"
      ? recent
      : songs;

  // Filter songs by title
  const filteredSongs = displayedSongs.filter((song) =>
    song?.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="song-list">
      <SearchBar />
      {loading ? (
        <p className="loading-text">Loading songs...</p>
      ) : filteredSongs.length > 0 ? (
        filteredSongs.map((song, index) => (
          <SongCard
            key={index}
            song={{
              title: song.title,
              artist: song.artistName || song.artist,
              duration: song.duration,
              cover: song.thumbnail || song.cover,
              audioUrl: song.musicUrl || song.audioUrl,
            }}
            onPlay={handlePlay}
          />
        ))
      ) : (
        <p className="no-results">No songs found.</p>
      )}
    </div>
  );
};

export default SongList;
