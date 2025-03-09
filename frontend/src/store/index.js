import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter(p => p.id !== productId);
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      const { data } = await axios.get('/api/products');
      commit('SET_PRODUCTS', data);
    },
    async addProduct({ commit }, product) {
      const { data } = await axios.post('/api/products', product);
      commit('ADD_PRODUCT', data);
    },
    async deleteProduct({ commit }, productId) {
      await axios.delete(`/api/products/${productId}`);
      commit('DELETE_PRODUCT', productId);
    }
  }
});
