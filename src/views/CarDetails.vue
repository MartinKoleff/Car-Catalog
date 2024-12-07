<template>
  <div class="car-details">
    <button @click="goBack" class="back-button">Back to Catalog</button>
    <div v-if="car">
      <h1>{{ car.brand }} {{ car.model }} ({{ car.year }})</h1>
      <p><strong>Color:</strong> {{ car.color }}</p>
      <p><strong>VIN:</strong> {{ car.vin }}</p>
      <p><strong>Price:</strong> {{ car.price || 'N/A' }}</p>
      <p><strong>Availability:</strong> {{ car.availability ? 'In Stock' : 'Out of Stock' }}</p>

      <button @click="toggleFavorite" class="favorite-button">
        {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
      </button>
    </div>
    
    <p v-else>Loading car details...</p>

      <!-- Debug Block -->
      <!-- <pre>{{ car }}</pre> -->
  </div>
</template>


<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFavoriteStore } from '../stores/favoriteStore';

export default {
  name: 'CarDetails',
  setup() {
    const route = useRoute(); 
    const router = useRouter(); 
    const car = ref(null); 
    const loading = ref(true); 
    const favoriteStore = useFavoriteStore();

    //Fetch car details by ID from the API
    const fetchCarDetails = async () => {
      try {
        loading.value = true;
        const response = await fetch(`https://myfakeapi.com/api/cars/${route.params.id}`);
        const data = await response.json();
        console.log('API response', data);

        car.value = {
            id: data.Car.id,
            brand: data.Car.car, 
            model: data.Car.car_model, 
            color: data.Car.car_color, 
            year: data.Car.car_model_year, 
            vin: data.Car.car_vin, 
            price: data.Car.price, 
            availability: data.Car.availability, 
        };
        // car.value = {...data.Car};
        console.log('Updated car:', car.value); 
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        loading.value = false;
      }
    };

    //Favorite
    const isFavorite = computed(() => {
      return car.value ? favoriteStore.isFavorite(car.value.id) : false;
    });

    const toggleFavorite = () => {
      if (car.value) {
        favoriteStore.toggleFavorite(car.value.id);
      }
    };

    const goBack = () => {
      router.push('/');
    };

    onMounted(async () => {
      await fetchCarDetails();
    });

    return {
      car,
      loading,
      isFavorite,
      toggleFavorite,
      goBack,
    };
  },
};
</script>

<style scoped>
.car-details {
  text-align: center;
  padding: 20px;
}

.back-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
}

.back-button:hover {
  background-color: #369f6b;
}

.car-image {
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  margin: 20px 0;
}

.favorite-button {
  background-color: #ff4c4c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

.favorite-button:hover {
  background-color: #d93838;
}
</style>
