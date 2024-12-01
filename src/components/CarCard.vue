<template>
  <div
    class="car-card"
    @click="viewDetails"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="car-info">
      <h2 class="car-title">{{ car.brand }} {{ car.model }}</h2>
      <p class="car-price">Price: {{ car.price }}</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import defaultCarImage from '@/assets/default-car.jpg';

export default {
  name: 'CarCard',
  props: {
    car: {
      type: Object,
      required: true,
    },
  },
  computed: {
    backgroundImage() {
      try {
        const imageUrl = require(`@/assets/${this.car.brand.toLowerCase()}.jpg`);
        console.log('Background image: ',imageUrl);
        return imageUrl;
      } catch (error) {
        console.log('Error finding image path');
        return defaultCarImage;
      }
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
  width: 300px;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  color: white;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.car-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

.car-info {
  background-color: rgba(0, 0, 0, 0.5); /* Dark overlay for text readability */
  padding: 8px;
  border-radius: 4px;
}

.car-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.car-price {
  font-size: 1rem;
}
</style>