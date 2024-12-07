import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoriteStore = defineStore('favoriteStore', () => {
  const favorites = ref([]);

  const toggleFavorite = (carId) => {
    if (favorites.value.includes(carId)) {
      favorites.value = favorites.value.filter((id) => id !== carId);
    } else {
      favorites.value.push(carId);
    }
  };

  const isFavorite = (carId) => {
    return favorites.value.includes(carId);
  };

  const getFavoriteCars = (allCars) => {
    return allCars.filter((car) => favorites.value.includes(car.id));
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCars,
  };
});
