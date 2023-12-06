<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits } from 'vue';


const emits = defineEmits();

const students = ref('');
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
    // const response = await axiosInstance.put(`http://localhost:3000/api/user/${encodeURIComponent(email.value)}`, {
    //   password: password.value,
    // });
    console.log('Réponse de l\'API :', response.data);
    success.value = 'Mot de passe mis à jour avec succès.';
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
    errors.value = 'Erreur lors de la mise à jour du mot de passe';
  }
};
const handleAction = (event: Event) => {
  const selectedOption = (event.target as HTMLSelectElement).value;
  console.log('Action sélectionnée :', selectedOption);
  if (selectedOption) {
    redirectTo(selectedOption);
  }
};
</script>

<template>
  <div class="mytext">
    <div class=" text container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Selectionner le nom de l'élève :</label>
          <select name="name" class="button" v-model="email" required>
            <option value="france">Paul Henri</option>
          </select>
          <!-- <select name="name" class="button" v-model="email" required v-for="student in students">
            <option value="france">{{ student }}</option>
          </select> -->
        </div>
        <div class="form-group">
            <label for="password">Nouvelle note :</label>
            <input class="input" type="text" id="note" v-model="password" required />
        </div>
        <div class="form-group">
            <label for="password">Confirmez la note :</label>
            <input class="input" type="text" id="not" v-model="password" required />
        </div>

        <div class="form-group">
          <div class="button">
            <button type="submit">Valider</button>
          </div>
        </div>
        <div v-if="success" class="success">{{ success }}</div>
        <div v-if="errors" class="error">{{ errors }}</div>
      </form>
    </div>
    
  </div>
  
</template>

<style scoped>
img{
  width: 50px; 
  height: auto; 
}
.icon{
  width: 50px; 
  height: auto; 
}
</style>
