<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';

interface Admin {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
}

const emits = defineEmits();

const admins = ref<Admin[]>([]);

const errors = ref('');
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`http://localhost:3000/api/users`);
    admins.value = response.data;
    console.log('Réponse de l\'API :', response.data);
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la récupération des administrateurs :', error);
    errors.value = 'Erreur lors de la récupération des administrateurs.';
    emits('onError', errors.value);
  }
});

</script>

<template>
  <div class="mytext">
    <div class="text container">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse e-mail</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins" :key="admin.id">
            <td>{{ admin.name }}</td>
            <td>{{ admin.email }}</td>
            <td>{{ admin.role.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
  
</template>

<style scoped>

</style>
