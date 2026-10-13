<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await api.post('login/', {
      username: username.value,
      password: password.value,
    });
    
    // Save token and redirect to the shop dashboard
    localStorage.setItem('access_token', response.data.access_token);
    router.push('/');
  } catch (err) {
    error.value = 'Invalid username or password.';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Flower Shop Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input 
            v-model="username" 
            type="text" 
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>