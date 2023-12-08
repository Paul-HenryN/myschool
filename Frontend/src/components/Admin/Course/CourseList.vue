<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';


const emits = defineEmits();

const teachers = ref([]);

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
    const response = await axiosInstance.get(`http://localhost:3000/api/user`);
    teachers.value = response.data;
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
            <th>Adresse différents cours</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers">
            <td>{{ teacher }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
  
</template>

<style scoped>

</style>
