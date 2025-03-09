<template>
  <div id="app">
    <NavBar v-if="showNavBar" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from './components/Navbar.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    NavBar
  },
  setup() {
    const route = useRoute();
    // Ocultar NavBar en la vista de login
    const showNavBar = computed(() => route.path !== '/login');

    return { showNavBar };
  }
};
</script>

<style>
 #app {
  font-family: 'Arial', sans-serif;
  text-align: center;
}

main {
  padding: 20px;
}
</style>