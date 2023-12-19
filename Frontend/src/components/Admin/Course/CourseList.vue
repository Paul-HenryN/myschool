<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';

interface Cours {
  id: number;
  name: string;
  coefficient: string;
}

const emits = defineEmits();

const cours = ref<Cours[]>([]);

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
    const response = await axiosInstance.get(`http://localhost:3000/api/subjects`);
    cours.value = response.data;
    console.log('Réponse de l\'API :', response.data);
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la récupération des élèves :', error);
    errors.value = 'Erreur lors de la récupération des élèves.';
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
            <th>Noms des différents cours</th>
            <th>Coefficient</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cour in cours" :key="cour.id">
            <td>{{ cour.name }}</td>
            <td>{{ cour.coefficient }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
  
</template>

<style scoped>

</style>
