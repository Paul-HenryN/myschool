<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits } from 'vue';

const emits = defineEmits();


const name = ref('');
const coefficient = ref('');

const success = ref('');
const errors = ref('');
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleSubmit = async () => {
  try {
    const response = await axiosInstance.post(`http://localhost:3000/api/subjects`, {
      name: name.value,
      coefficient: coefficient.value,
    });
    console.log('Réponse de l\'API :', response.data);
    success.value = 'Administrateur ajouter avec succès.';

    name.value = '';
    coefficient.value = '';
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur, cours pas ajouté :', error);
    errors.value = 'Erreur, cours pas ajouté';
    emits('onError', errors.value);
  }
};
</script>

<template>
  <div class="mytext">
    <div class="text container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="name">Veuillez saisir l'intitulé de la matière à ajouter:</label>
            <input class="input" type="name" id="name" v-model="name" required />
        </div>
        <div class="form-group">
            <label for="email">Veuillez entrer le coefficient de la matière:</label>
            <input class="input" type="number" id="coefficient" v-model="coefficient" required />
        </div>

        <div class="form-group">
          <div class="button">
            <button type="submit" >Valider</button>
          </div>
        </div>

        <div v-if="success" class="success">{{ success }}</div>
        <div v-if="errors" class="error">{{ errors }}</div>
      </form>
    </div>
    
  </div>
  
</template>

<style scoped>
</style>
