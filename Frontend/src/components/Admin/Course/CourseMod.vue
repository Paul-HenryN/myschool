<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';

interface Subjects {
  id: number;
  name: string;
  coefficient: number;
}

const emits = defineEmits();

const name = ref('');
const coefficient = ref('');

const subjects = ref<Subjects[]>([]);
const selectedSubject = ref<number | null>(null); 

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

onMounted(async () => {
  try {
    const response = await axiosInstance.get(`http://localhost:3000/api/subjects`);
    subjects.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des matières :', error);
    emits('onError', 'Erreur lors de la récupération des matières.');
  }
});

const handleSubmit = async () => {
  try {
    const response = await axiosInstance.put(`http://localhost:3000/api/subjects/${selectedSubject.value}`, {
      name: name.value,
      coefficient: coefficient.value,
    });
    console.log('Réponse de l\'API :', response.data);
    success.value = 'Mis à jour avec succès.';

    name.value = '';
    coefficient.value = '';
    selectedSubject.value = null;

  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la mise à jour :', error);
    errors.value = 'Erreur lors de la mise à jour';
  }
};
</script>

<template>
  <div class="mytext">
    <div class="text container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Veuillez choisir la matière à modifier:</label>
          <select class="input button buttonselect" id="subject" v-model="selectedSubject" required>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
          </select>
        </div>
        <div class="form-group">
            <label for="name">Nouvel intitulé de la matière à ajouter:</label>
            <input class="input" type="name" id="name" v-model="name" required/>
        </div>
        <div class="form-group">
            <label for="email">Nouveau coefficient de la matière:</label>
            <input class="input" type="number" id="coefficient" v-model="coefficient" required/>
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
.form-group{
  text-align: left;
  width: 100%;
}
.buttonselect{
  width: 100%;
  background-color: #36a5dd;
}
</style>
