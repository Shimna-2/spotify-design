// src/store/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    activeTab: "all",
    query: "", // ✅ make sure this exists
  },
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
});

export const { setActiveTab, setQuery } = uiSlice.actions;
export default uiSlice.reducer;
