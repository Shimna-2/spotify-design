// src/store/songsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../dummyData";
import {
  saveFavouritesToLocalStorage,
  loadFavouritesFromLocalStorage,
} from "../helpers/localStorage";
import {
  loadRecentlyPlayedFromSessionStorage,
  saveRecentlyPlayedToSessionStorage,
} from "../helpers/sessionStorage";

const initialState = {
  allSongs: dummyData,
  currentSong: null,
  favourites: loadFavouritesFromLocalStorage(),
  recentlyPlayed: loadRecentlyPlayedFromSessionStorage(),
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;

      // Update recently played (max 10)
      const existing = state.recentlyPlayed.filter(
        (song) => song.title !== action.payload.title
      );
      const updated = [action.payload, ...existing].slice(0, 10);
      state.recentlyPlayed = updated;
      saveRecentlyPlayedToSessionStorage(updated);
    },
    setRecentlyPlayed: (state, action) => {
      const existing = state.recentlyPlayed.filter(
        (song) => song.title !== action.payload.title
      );
      const updated = [action.payload, ...existing].slice(0, 10);
      state.recentlyPlayed = updated;
      saveRecentlyPlayedToSessionStorage(updated);
    },
    toggleFavourite: (state, action) => {
      const song = action.payload;
      const exists = state.favourites.find((s) => s.title === song.title);
      if (exists) {
        state.favourites = state.favourites.filter(
          (s) => s.title !== song.title
        );
      } else {
        state.favourites = [...state.favourites, song];
      }
      saveFavouritesToLocalStorage(state.favourites);
    },
  },
});

export const { setSongs, setCurrentSong, setRecentlyPlayed, toggleFavourite } =
  songsSlice.actions;

export default songsSlice.reducer;
