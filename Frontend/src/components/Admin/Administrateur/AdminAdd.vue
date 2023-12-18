<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits } from 'vue';


const emits = defineEmits();

const name = ref('');
const email = ref('');
const password = ref('');
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
    const response = await axiosInstance.post(`http://localhost:3000/api/user/add-user`, {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    console.log('Réponse de l\'API :', response.data);
    success.value = 'Administrateur ajouter avec succès.';
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur, administrateur pas ajouté :', error);
    errors.value = 'Erreur, administrateur pas ajouté';
    emits('onError', errors.value);
  }
};
const handleAction = (event: Event) => {
  const selectedOption = (event.target as HTMLSelectElement).value;
  console.log('Action sélectionnée :', selectedOption);
  if (selectedOption) {
    // Passez la valeur sélectionnée à la fonction redirectTo
    redirectTo(selectedOption);
  }
};
</script>

<template>
  <div class="mytext">
    <div class="text container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="name">Veuillez saisir le nom de l'administrateur à ajouter:</label>
            <input class="input" type="name" id="name" v-model="name" required />
        </div>
        <div class="form-group">
            <label for="email">Veuillez saisir le mail de l'administrateur à ajouter:</label>
            <input class="input" type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
            <label for="password">Veuillez saisir le mot de passe de l'administrateur à ajouter:</label>
            <input class="input" type="password" id="password" v-model="password" required />
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
