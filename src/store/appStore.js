// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songsSlice";
import playerReducer from "./playerSlice";
import uiReducer from "./uiSlice";
import searchReducer from "./searchSlice";

const appStore = configureStore({
  reducer: {
    songs: songsReducer,
    player: playerReducer,
    ui: uiReducer,
    search: searchReducer,
  },
});

export default appStore;
