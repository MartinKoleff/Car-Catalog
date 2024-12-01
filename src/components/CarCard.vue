<template>
  <div class="car-card" @click="viewDetails">
    <img :src="car.image" :alt="car.model" class="car-image" />
    <h2>{{ car.brand }} {{ car.model }}</h2>
    <p>Price: ${{ car.price }}</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'CarCard',
  props: {
    car: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter(); 

    const viewDetails = () => {
      router.push(`/car/${props.car.id}`); 
    };

    return {
      viewDetails,
    };
  },
};
</script>

<style scoped>
.car-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  max-width: 300px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* Make the card look clickable */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.car-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.car-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 12px;
}
</style>
