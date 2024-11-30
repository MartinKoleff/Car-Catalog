<template>
    <div class="car-details">
      <button @click="goBack" class="back-button">Back to Catalog</button>
      <div v-if="car">
        <h1>{{ car.brand }} {{ car.model }}</h1>
        <img :src="car.image" :alt="car.model" class="car-image" />
        <p><strong>Manufacturer:</strong> {{ car.manufacturer }}</p>
        <p><strong>Specifications:</strong> {{ car.specs }}</p>
        <p><strong>Price:</strong> ${{ car.price }}</p>
      </div>
      <p v-else>Loading car details...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CarDetails',
    data() {
      return {
        car: null, // To store the details of the selected car
      };
    },
    methods: {
      fetchCarDetails() {
        // Hardcoded data for now (same as in CarList.vue)
        const cars = [
          {
            id: 1,
            manufacturer: 'Tesla',
            brand: 'Tesla',
            model: 'Model S',
            specs: 'Electric, Autopilot, Long Range',
            price: 79999,
            image: 'https://via.placeholder.com/300x200.png?text=Tesla+Model+S',
          },
          {
            id: 2,
            manufacturer: 'Ford',
            brand: 'Ford',
            model: 'Mustang',
            specs: 'V8 Engine, Convertible, Sporty',
            price: 55999,
            image: 'https://via.placeholder.com/300x200.png?text=Ford+Mustang',
          },
          {
            id: 3,
            manufacturer: 'BMW',
            brand: 'BMW',
            model: '3 Series',
            specs: 'Luxury, Sedan, Turbocharged',
            price: 45999,
            image: 'https://via.placeholder.com/300x200.png?text=BMW+3+Series',
          },
        ];
  
        // Get the car ID from the route parameter
        const carId = Number(this.$route.params.id);
  
        // Find the car with the matching ID
        this.car = cars.find((car) => car.id === carId);
      },
      goBack() {
        this.$router.push('/'); // Navigate back to the home page
      },
    },
    mounted() {
      this.fetchCarDetails(); // Fetch car details when the component is mounted
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
  