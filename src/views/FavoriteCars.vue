<template>
    <div class="favorite-cars">
      <h1>My Favorite Cars</h1>
      <div v-if="favoriteCars.length > 0" class="car-list">
        <CarCard
          v-for="car in favoriteCars"
          :key="car.id"
          :car="car"
        />
      </div>
      <p v-else class="no-favorites">You haven't added any cars to your favorites yet!</p>
    </div>
  </template>
  
<script>
import { computed, onMounted, ref } from 'vue';
import { useFavoriteStore } from '@/stores/favoriteStore';
import CarCard from '@/components/CarCard.vue';

export default {
  name: 'FavoriteCars',
  components: {
    CarCard,
  },
  setup() {
    const favoriteStore = useFavoriteStore();
    const allCars = ref([]);
    const loading = ref(true);

    //Fetch all cars from the server
    const fetchCars = async () => {
      try {
        loading.value = true;
        const response = await fetch('http://localhost:3000/api/cars');
        const data = await response.json();
        allCars.value = data;
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        loading.value = false;
      }
    };

    const favoriteCars = computed(() => {
      return favoriteStore.getFavoriteCars(allCars.value);
    });

    onMounted(async () => {
      await fetchCars();
    });

    return {
      favoriteCars,
      loading,
    };
  },
};
</script>
  
  <style scoped>
  .favorite-cars {
    padding: 16px;
    text-align: center;
  }
  
  .car-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
  
  .no-favorites {
    margin-top: 20px;
    font-size: 18px;
    color: gray;
  }
  </style>
  