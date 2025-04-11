import React from "react";
import "./Header.scss"; // Import the SCSS file

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
          alt="Spotify Logo"
        />
        <h2>Spotify</h2>
      </div>
    </div>
  );
};

export default Header;
