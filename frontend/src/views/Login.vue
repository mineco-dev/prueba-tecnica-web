<template>
   <div class="login-container">
    <div class="login-box">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input v-model="credentials.email" placeholder="Correo electrónico" type="email" class="input-field" required />
        <input v-model="credentials.password" placeholder="Contraseña" type="password" class="input-field" required />
        <button type="submit" class="login-button">Ingresar</button>
      </form>
    </div>
  </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const credentials = ref({ email: '', password: '' });
  
      const login = async () => {
        try {
          const { data } = await axios.post('/api/login', credentials.value);
          localStorage.setItem('token', data.token);
          router.push('/');
        } catch (error) {
          alert('Credenciales inválidas');
        }
      };
  
      return { credentials, login };
    }
  };
  </script>
  <style scoped>
  /* Estilos generales */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 42px);
    background: linear-gradient(to right, #4a90e2, #1459a5); 
  }
  .login-box {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 350px;
  }
  h2 {
    margin-bottom: 20px;
    color: #333;
  }
  .input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: 0.3s;
  }

  .input-field:focus {
    border-color: #4a90e2;
    outline: none;
  }
  .login-button {
    width: 100%;
    padding: 10px;
    background: #4a90e2;
    border: none;
    color: white;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }
  .login-button:hover {
    background: #357ac5;
  }
  </style>