import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import AboutPage from './views/AboutPage.vue';
import ContactPage from './views/ContactPage.vue';
import CarDetails from './views/CarDetails.vue'; 
import FavoriteCars from './views/FavoriteCars.vue'; 

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/about', component: AboutPage, name: 'About' },
  { path: '/contact', component: ContactPage, name: 'Contact' },
  { path: '/car/:id', component: CarDetails, name: 'CarDetails' },
  { path: '/favorites', component: FavoriteCars, name: 'Favorites' },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;