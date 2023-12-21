<script setup lang="ts">
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';

interface Users {
  "id": number;
  "email": string;
  "name" : string;
}

const emits = defineEmits();

const users = ref<Users[]>([]);
const selectedUser = ref<number | null>(null);

const errors = ref('');
const success = ref('');
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
    users.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des matières :', error);
    emits('onError', 'Erreur lors de la récupération des matières.');
  }
});

const handleSubmit = async () => {
  try {
    if (!selectedUser.value) {
      errors.value = 'Veuillez choisir un utilisateur.';
      return;
    }
    const response = await axiosInstance.delete(`http://localhost:3000/api/users/${selectedUser.value}`, {
    });
    console.log('Réponse de l\'API :', response.data);
    success.value = 'Administrateur supprimé avec succès.';
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la suppression :', error);
    errors.value = 'Erreur lors de la suppression.';
    emits('onError', errors.value);
  }
};
</script>

<template>
  <div class="mytext">
    <div class="text container">
      <p> 
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Veuillez choisir le mail de l'utilisateur à supprimer:</label>
            <select class="input button buttonselect" id="name" v-model="selectedUser" required>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.email }}</option>
            </select>
          </div>

          <div class="form-group">
          <div class="button">
            <button type="submit"  >Valider</button>
          </div>
          </div>

          <div v-if="success" class="success">{{ success }}</div>
          <div v-if="errors" class="error">{{ errors }}</div>
        </form>
      </p>
    </div>
    
  </div>
  
</template>

<style scoped>
.buttonselect{
  width: 100%;
  background-color: #36a5dd;
}
</style>
