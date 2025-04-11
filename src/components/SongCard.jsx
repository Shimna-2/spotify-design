import React from "react";
import "./SongCard.scss";

const SongCard = ({ song, onPlay }) => {
  return (
    <div className="song-card" onClick={() => onPlay(song)}>
      <div className="song-info">
        <img src={song.cover} alt={song.title} className="cover" />
        <div className="details">
          <span className="title">{song.title}</span>
          <span className="artist">{song.artist}</span>
        </div>
      </div>
      <div className="right-section">
        <span className="duration">{song.duration}</span>
      </div>
    </div>
  );
};

export default SongCard;
