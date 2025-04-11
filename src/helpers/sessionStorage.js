// helpers/sessionStorage.js
export const loadRecentlyPlayedFromSessionStorage = () => {
  const data = sessionStorage.getItem("recentlyPlayed");
  return data ? JSON.parse(data) : [];
};

export const saveRecentlyPlayedToSessionStorage = (songs) => {
  sessionStorage.setItem("recentlyPlayed", JSON.stringify(songs));
};
