import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsPlaying } from "../store/playerSlice";
import { toggleFavourite } from "../store/songsSlice";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaEllipsisH,
  FaHeart,
} from "react-icons/fa";
import "./CurrentSongPlayer.scss";

const CurrentSongPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.songs.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const favourites = useSelector((state) => state.songs.favourites);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.load();

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => dispatch(setIsPlaying(true));
    const handlePause = () => dispatch(setIsPlaying(false));

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong && isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) =>
          console.warn("Autoplay failed on song change:", err)
        );
      }
    }
  }, [currentSong, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      dispatch(setIsPlaying(false));
    } else {
      audio
        .play()
        .then(() => dispatch(setIsPlaying(true)))
        .catch((err) => console.warn("Play was interrupted:", err));
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleFavourite = () => {
    if (!currentSong) return;
    dispatch(toggleFavourite(currentSong));
    setShowMenu(false);
  };

  if (!currentSong) {
    return (
      <div className="current-song-player">
        <h2>No song selected</h2>
      </div>
    );
  }

  const isFavourited = favourites.some((s) => s.title === currentSong.title);

  return (
    <div className="current-song-player">
      <div className="song-info">
        <h2 className="song-title">{currentSong.title}</h2>
        <p className="song-artist">{currentSong.artist}</p>
      </div>

      <div className="album-art">
        <img
          src={currentSong.thumbnail || currentSong.cover}
          alt={currentSong.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/400x400.png?text=No+Cover";
          }}
        />
      </div>

      <div className="controls-wrapper">
        <input
          type="range"
          className="progress-bar"
          value={progress}
          max={duration || 0}
          step="0.01"
          onChange={handleProgressChange}
        />
        <div className="player-controls">
          <div className="dropdown-wrapper">
            <FaEllipsisH
              className="icon"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="dropdown-menu">
                <h4
                  onClick={handleFavourite}
                  style={{ color: "white", cursor: "pointer" }}
                >
                  {isFavourited
                    ? "Remove from Favourites"
                    : "Add to Favourites"}
                  <FaHeart style={{ color: "white", marginLeft: 6 }} />
                </h4>
              </div>
            )}
          </div>
          <FaBackward className="icon" />
          <div className="play-pause-button" onClick={togglePlay}>
            {isPlaying ? (
              <FaPause className="icon" />
            ) : (
              <FaPlay className="icon" />
            )}
          </div>
          <FaForward className="icon" />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.musicUrl || currentSong.audioUrl}
        preload="auto"
        hidden
      />
    </div>
  );
};

export default CurrentSongPlayer;
