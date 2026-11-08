import { create } from 'zustand';

export const useFavoriteStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  
  toggleFavorite: (user) =>
    set((state) => {
      const exists = state.favorites.some((fav) => fav.id === user.id);
      const updatedFavorites = exists
        ? state.favorites.filter((fav) => fav.id !== user.id)
        : [...state.favorites, user];

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),
}));