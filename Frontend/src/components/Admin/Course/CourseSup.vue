<script setup lang="ts">
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';

interface Subjects {
  id: number;
  name: string;
  coefficient: number;
}

const emits = defineEmits();

const subjects = ref<Subjects[]>([]);
const selectedSubject = ref<number | null>(null); 

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
    const response = await axiosInstance.get(`http://localhost:3000/api/subjects`);
    subjects.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des matières :', error);
    emits('onError', 'Erreur lors de la récupération des matières.');
  }
});

const handleSubmit = async () => {
  try {
    if (!selectedSubject.value) {
      errors.value = 'Veuillez choisir une matière à supprimer.';
      emits('onError', errors.value);
      return;
    }

    const response = await axiosInstance.delete(`http://localhost:3000/api/subjects/${selectedSubject.value}`, {});

    console.log('Réponse de l\'API :', response.data);
    success.value = 'Matière supprimée avec succès.';

    selectedSubject.value = null;
       
  } catch (error) {
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
            <label for="name">Veuillez choisir la matière à supprimer:</label>
            <select class="input button buttonselect" id="subject" v-model="selectedSubject">
              <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
            </select>
          </div>
          
          <div class="form-group">
            <div class="button">
              <button type="submit">Valider</button>
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
.form-group{
  text-align: left;
  width: 100%;
}
.buttonselect{
  width: 100%;
  background-color: #36a5dd;
}
</style>
