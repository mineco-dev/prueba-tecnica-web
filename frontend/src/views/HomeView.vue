<template>
  <div class="home-container">
    <h1>Bienvenido a la Gestión de Productos</h1>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>
<style scoped>
.home-container {
  height: calc(100vh - 110px); 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/fondo1.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  width: 100%;
}

</style>