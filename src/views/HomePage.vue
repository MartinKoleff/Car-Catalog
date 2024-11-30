<template>
    <div>
      <h1>Welcome to the Car Catalog</h1>
      <CarList />
    </div>
  </template>
  
  <script>
  import CarList from '../components/CarList.vue';
  
  export default {
    name: 'HomePage',
    components: {
      CarList,
    },
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  </style>
  