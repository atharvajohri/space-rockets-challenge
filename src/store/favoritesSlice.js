import { createSlice } from "@reduxjs/toolkit";

let storedFavorites = [];

try {
  storedFavorites = JSON.parse(window.localStorage.getItem("favorites"));
} catch (e) {
  console.error("Failure to parse existing favorites", e);
}

export const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState: {
    favorites: storedFavorites || [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      window.localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action) => {
      const itemIdKey = action.payload.idKey;
      state.favorites = state.favorites.filter(
        (item) => item[itemIdKey]?.toString() !== action.payload.item[itemIdKey]?.toString()
      );
      window.localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const getFavorites = (state) => state.favorites;
export const isFavorite = (state, favoriteObject) =>
  state.favorites.some((f) => f[favoriteObject.idKey]?.toString() === favoriteObject.id?.toString());

export default favoritesSlice.reducer;
