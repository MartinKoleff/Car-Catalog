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
import { ref, onMounted, computed } from 'vue';
import CarCard from './CarCard.vue';

export default {
  name: 'CarList',
  components: {
    CarCard,
  },
  setup() {
    const cars = ref([]); 
    const searchQuery = ref('');
    const desiredBrands = [
      'BMW',
      'Mercedes-Benz',
      'Audi',
      'Volvo',
      'Chevrolet',
      'Ford',
      'Dodge',
      'Maserati'
    ];

    //Fetch car data from the API
    const fetchCars = async () => {
      try {
        const response = await fetch('https://myfakeapi.com/api/cars');
        const data = await response.json();
        console.log('API response: ', data);

        //cars.value = data.cars;
        cars.value = data.cars.map((car) => ({
          brand: car.car,
          id: car.id,
          model: car.car_model,
          color: car.car_color,
          year: car.car_model_year,
          vin: car.car_vin,
          price: car.price,
          availability: car.availability,
        }))  
        .filter((car) => desiredBrands.includes(car.brand));

        console.log('Parsed cars:', cars.value);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    onMounted(() => {
      fetchCars();
    });

    const filteredCars = computed(() => {
      return cars.value.filter((car) => {
        const carName = `${car.brand} ${car.model}`.toLowerCase();
        return carName.includes(searchQuery.value.toLowerCase());
      });
    });

    return {
      cars,
      searchQuery,
      filteredCars,
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
      // searchQuery: '', // User's search query
    };
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
