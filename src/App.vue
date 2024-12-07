<template>
  <div id="app">
    <header class="app-header">
      <nav>
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About Website</router-link>
        <router-link to="/contact" class="nav-link">Contact Us</router-link>
        <router-link to="/favorites" class="nav-link">Favorite Cars</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

.app-header {
  background-color: #42b983;
  padding: 16px;
}

.nav-link {
  color: white;
  margin: 0 10px;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}

main {
  padding: 16px;
}
</style>
