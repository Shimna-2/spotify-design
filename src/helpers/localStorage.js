const FAVOURITES_KEY = "favourites";

export const saveFavouritesToLocalStorage = (favourites) => {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
};

export const loadFavouritesFromLocalStorage = () => {
  const data = localStorage.getItem(FAVOURITES_KEY);
  return data ? JSON.parse(data) : [];
};
