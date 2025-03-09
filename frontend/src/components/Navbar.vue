<template>
  <nav class="navbar">
    <router-link to="/">Inicio</router-link>
    <router-link to="/products">Productos</router-link>
    <router-link v-if="!isAuthenticated" to="/login">Iniciar Sesión</router-link>
    <button v-if="isAuthenticated" @click="logout">Cerrar Sesión</button>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const isAuthenticated = computed(() => !!localStorage.getItem('token'));

    const logout = () => {
      localStorage.removeItem('token');
      router.push('/login');
    };

    return { isAuthenticated, logout };
  }
};
</script>

  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #333;
  }
  .navbar a, .navbar button {
    color: white;
    text-decoration: none;
    padding: 10px;
  }
  .navbar button {
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  