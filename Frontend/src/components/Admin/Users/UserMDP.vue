<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';

interface Users {
  "id": number;
  "email": string;
  "name" : string;
}


const emits = defineEmits();

const name = ref('');
const email = ref('');
const password = ref('');
const repassword = ref('');

const errors = ref('');
const success = ref('');
const role = ref('');
const users = ref<Users[]>([]);
const selectedUser = ref<number | null>(null); 

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
    const response = await axiosInstance.put(`http://localhost:3000/api/user/${encodeURIComponent(email.value)}`, {
      password: password.value,
    });
    console.log('Réponse de l\'API :', response.data);
    success.value = 'Mot de passe mis à jour avec succès.';
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
    errors.value = 'Erreur lors de la mise à jour du mot de passe';
  }
};
</script>

<template>
  <div class="mytext">
    <div class="text container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Veuillez choisir l'utilisateur à modifier:</label>
          <select class="input button buttonselect" id="subject" v-model="selectedUser" required>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.email }}</option>
          </select>
        </div>
        <div class="form-group">
            <label for="name">Veuillez saisir le nouveau nom :</label>
            <input class="input" type="name" id="name" v-model="name" required />
        </div>
        <div class="form-group">
            <label for="email">Veuillez saisir le nouveau mail :</label>
            <input class="input" type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
            <label for="password">Veuillez saisir le nouveau mot de passe :</label>
            <input class="input" type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
            <label for="password">Veuillez re-saisir le mot de passe :</label>
            <input class="input" type="password" id="password" v-model="repassword" required />
        </div>
        <div class="form-group">
          <label for="role">Choisir le rôle :</label>
          <div class="role-radio-buttons">
              <input type="radio" v-model="role" value="admin" /> Administrateur
              <input type="radio" v-model="role" value="teacher" /> Enseignant
              <input type="radio" v-model="role" value="student" /> Étudiant
          </div>
        </div>

        <div v-if="role === 'teacher'" class="form-group">
          <label for="name">Matière enseignée :</label>
          <select class="input button buttonselect" id="subject" v-model="selectedUser">
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <div class="button">
            <button type="submit" >Valider</button>
          </div>
        </div>
        <div v-if="password!=repassword" class="error">le deux mot de passe entrés ne sont pas identiques</div>
        <div v-if="success" class="success">{{ success }}</div>
        <div v-if="errors" class="error">{{ errors }}</div>
      </form>
    </div>
    
  </div>
  
</template>

<style scoped>
.role-radio-buttons {
  display: flex;
}
.role-checkboxes label {
  font-size: 10px;
}
.form-group{
  text-align: left;
  width: 100%;
}
.buttonselect{
  width: 100%;
  background-color: #36a5dd;
}
</style>
