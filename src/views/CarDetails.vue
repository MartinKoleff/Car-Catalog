<template>
  <div class="car-details">
    <button @click="goBack" class="back-button">Back to Catalog</button>
    <div v-if="car">
      <h1>{{ car.brand }} {{ car.model }} ({{ car.year }})</h1>
      <p><strong>Color:</strong> {{ car.color }}</p>
      <p><strong>VIN:</strong> {{ car.vin }}</p>
      <p><strong>Price:</strong> {{ car.price || 'N/A' }}</p>
      <p><strong>Availability:</strong> {{ car.availability ? 'In Stock' : 'Out of Stock' }}</p>
    </div>
    <p v-else>Loading car details...</p>

      <!-- Debug Block -->
      <!-- <pre>{{ car }}</pre> -->
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'CarDetails',
  setup() {
    const route = useRoute(); 
    const router = useRouter(); 
    const car = ref(null); 

    //Fetch car details by ID from the API
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`https://myfakeapi.com/api/cars/${route.params.id}`);
        const data = await response.json();
        console.log('API response', data);

        car.value = {
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
</style>
