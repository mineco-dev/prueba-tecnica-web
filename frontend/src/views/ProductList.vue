<template>
  <div>
    <h2>Listado de Productos</h2>
    <router-link to="/product">
      <button class="btn">Agregar Producto</button>
    </router-link>
    <div v-if="loading">Cargando...</div>
    <table v-else>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Precio IVA</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products.data" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.price_with_vat }}</td>
          <td>
            <router-link :to="`/product/${product.id}`">
              <button class="btn-edit">Editar</button>
            </router-link>
            <button class="btn-delete" @click="deleteProduct(product.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Paginación -->
    <div class="pagination" v-if="products.last_page > 1">
      <button :disabled="!products.prev_page_url" @click="fetchProducts(products.prev_page_url)">
        Anterior
      </button>
      <span>Página {{ products.current_page }} de {{ products.last_page }}</span>
      <button :disabled="!products.next_page_url" @click="fetchProducts(products.next_page_url)">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const products = ref({
      data: [],
      current_page: 1,
      last_page: 1,
      prev_page_url: null,
      next_page_url: null,
    });
    const loading = ref(true);

    // Cargar productos desde la API
    const fetchProducts = async (url = 'http://localhost:8000/api/products') => {
      try {
        const response = await axios.get(url);
        products.value = response.data;
      } catch (error) {
        console.error('Error al obtener los productos', error);
      } finally {
        loading.value = false;
      }
    };

    // Eliminar producto
    const deleteProduct = async (id) => {
      if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        try {
          await axios.delete(`http://localhost:8000/api/products/${id}`);
          fetchProducts(); // Recargar los productos después de eliminar
        } catch (error) {
          console.error('Error al eliminar el producto', error);
        }
      }
    };

    onMounted(fetchProducts);

    return { products, loading, fetchProducts, deleteProduct };
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #333;
  color: white;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}

.btn-delete {
  background-color: #f44336;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
}
</style>