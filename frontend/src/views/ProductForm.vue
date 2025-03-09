<template>
  <div>
    <h2>{{ isEditing ? "Editar Producto" : "Agregar Producto" }}</h2>
    <form @submit.prevent="saveProduct">
      <label for="name">Nombre:</label>
      <input v-model="product.name" type="text" required />
      <label for="description">Descripción:</label>
      <textarea v-model="product.description" required></textarea>
      <label for="price">Precio:</label>
      <input v-model.number="product.price" type="number" step="0.01" required />
      <label for="stock">Stock:</label>
      <input v-model.number="product.stock" type="number" required />
      <button type="submit" class="btn-save">
        {{ isEditing ? "Actualizar Producto" : "Guardar Producto" }}
      </button>
    </form>
    <button class="btn-back" @click="$router.push('/products')">Volver al listado</button>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref({
      name: "",
      description: "",
      price: "",
      stock: "",
    });
    const isEditing = ref(false);

    // Obtener token de autenticación de localStorage
    const authToken = localStorage.getItem("token");

    // Cargar datos si es edición
    onMounted(async () => {
      if (route.params.id) {
        isEditing.value = true;
        try {
          const response = await axios.get(`http://localhost:8000/api/products/${route.params.id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          product.value = response.data.product;
        } catch (error) {
          console.error("Error al cargar el producto:", error);
        }
      }
    });

    // Guardar o actualizar el producto
    const saveProduct = async () => {
      try {
        if (isEditing.value) {
          await axios.put(`http://localhost:8000/api/products/${route.params.id}`, product.value, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
        } else {
          await axios.post("http://localhost:8000/api/products", product.value, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
        }
        router.push("/products");
      } catch (error) {
        console.error("Error al guardar el producto:", error);
      }
    };

    return { product, saveProduct, isEditing };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}

label {
  margin-top: 10px;
}

input, textarea {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-save {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}

.btn-back {
  background-color: #6c757d;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
</style>
