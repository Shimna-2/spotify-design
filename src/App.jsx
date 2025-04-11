import React from "react";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import CurrentSongPlayer from "./components/CurrentSongPlayer";
import "./App.scss";

const App = () => {
  return (
    <div className="app-layout">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="songlist-wrapper">
        <SongList />
      </div>
      <div className="player-wrapper">
        <CurrentSongPlayer />
      </div>
    </div>
  );
};

export default App;
