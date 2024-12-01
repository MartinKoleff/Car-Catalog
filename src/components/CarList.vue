<template>
  <div class="car-list-container">
    <!-- Search Bar -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search cars by name..."
      />
    </div>

    <!-- Car Cards -->
    <div class="car-list">
      <CarCard
        v-for="car in filteredCars"
        :key="car.id"
        :car="car"
      />
      <p v-if="filteredCars.length === 0">No cars match your search.</p>
    </div>
  </div>
</template>

<script>

import { ref, onMounted } from 'vue';
import CarCard from './CarCard.vue';

export default {
  name: 'CarList',
  components: {
    CarCard,
  },
  setup() {
    const cars = ref([]);

    //Fetch car data from the API
    const fetchCars = async () => {
      try {
        const response = await fetch('https://myfakeapi.com/api/cars');
        const data = await response.json();
        cars.value = data.cars; 
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    onMounted(() => {
      fetchCars(); 
    });

    return {
      cars,
    };
  },
  data() {
    return {
      // Hardcoded car data
      // cars: [
      //   {
      //     id: 1,
      //     manufacturer: 'Tesla',
      //     brand: 'Tesla',
      //     model: 'Model S',
      //     specs: 'Electric, Autopilot, Long Range',
      //     price: 79999,
      //     image: 'https://via.placeholder.com/300x200.png?text=Tesla+Model+S',
      //   },
      //   {
      //     id: 2,
      //     manufacturer: 'Ford',
      //     brand: 'Ford',
      //     model: 'Mustang',
      //     specs: 'V8 Engine, Convertible, Sporty',
      //     price: 55999,
      //     image: 'https://via.placeholder.com/300x200.png?text=Ford+Mustang',
      //   },
      //   {
      //     id: 3,
      //     manufacturer: 'BMW',
      //     brand: 'BMW',
      //     model: '3 Series',
      //     specs: 'Luxury, Sedan, Turbocharged',
      //     price: 45999,
      //     image: 'https://via.placeholder.com/300x200.png?text=BMW+3+Series',
      //   },
      // ],
      searchQuery: '', // User's search query
    };
  },
  computed: {
    //Filter cars based on the search query
    filteredCars() {
      return this.cars.filter((car) => {
        const carName = `${car.brand} ${car.model}`.toLowerCase(); //Combine brand and model
        return carName.includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.car-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.search-bar {
  margin-bottom: 16px;
  width: 100%;
  max-width: 500px;
}

.search-bar input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.car-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

p {
  margin-top: 16px;
  font-size: 18px;
  color: gray;
}
</style>
