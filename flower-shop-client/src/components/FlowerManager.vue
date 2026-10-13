<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

// Define the TypeScript interface matching your Django Flower model
interface Flower {
  id: number;
  flower_name: string;
  price: number;
}

const flowers = ref<Flower[]>([]);
const error = ref<string | null>(null);
const router = useRouter();

// Fetch flowers from Django backend
const fetchFlowers = async () => {
  try {
    const response = await api.get<Flower[]>('shop/flowers/');
    flowers.value = response.data;
  } catch (err: any) {
    error.value = 'Failed to load flowers. Ensure you are logged in.';
    console.error(err);
  }
};

// Clear token and redirect to login
const logout = () => {
  localStorage.removeItem('access_token');
  router.push('/login');
};

onMounted(() => {
  fetchFlowers();
});
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Flower Inventory</h1>
      <button 
        @click="logout" 
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
    
    <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded mb-4">
      {{ error }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="flower in flowers" 
        :key="flower.id" 
        class="bg-white shadow-md rounded-lg p-6 border border-gray-200"
      >
        <h2 class="text-xl font-semibold text-gray-700">{{ flower.flower_name }}</h2>
        <p class="text-green-600 font-bold mt-2">₱{{ flower.price }}</p>
      </div>
    </div>
  </div>
</template>