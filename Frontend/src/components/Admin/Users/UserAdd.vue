<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';


const emits = defineEmits();

const name = ref('');
const email = ref('');
const password = ref('');
const repassword = ref('');

const admin = ref(''); 
const teacher = ref(''); 
const student = ref(''); 

const success = ref('');
const errors = ref('');

const role = ref('');
const subjects = ref([]);
const selectedSubject = ref(null);

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
    let apiUrl = '';

    switch (role) {
      case admin:
        apiUrl = 'http://localhost:3000/api/user';
        break;
      case teacher:
        apiUrl = 'http://localhost:3000/api/teacher';
        break;
      case student:
        apiUrl = 'http://localhost:3000/api/student';
        break;
      default:
        throw new Error('Rôle non valide');
    }

    const response = await axiosInstance.post(apiUrl, {
      name: name.value,
      email: email.value,
      password: password.value,
      role,
      subject: role === teacher ? selectedSubject.value : undefined,
    });

    console.log('Réponse de l\'API :', response.data);
    success.value = 'Utilisateur ajouté avec succès.';
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur, utilisateur pas ajouté :', error);
    errors.value = 'Erreur, utilisateur pas ajouté';
    emits('onError', errors.value);
  }
};


</script>

<template>
  <div class="mytext">
    <div class="text container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="name">Veuillez saisir le nom de l'utilisateur à ajouter:</label>
            <input class="input" type="name" id="name" v-model="name" required />
        </div>
        <div class="form-group">
            <label for="email">Veuillez saisir le mail de l'utilisateur à ajouter:</label>
            <input class="input" type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
            <label for="password">Veuillez saisir le mot de passe de l'utilisateur à ajouter:</label>
            <input class="input" type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
            <label for="password">Veuillez re-saisir le mot de passe de l'utilisateur à ajouter:</label>
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
          <label for="subject">Matière enseignée :</label>
          <select class="input button buttonselect" id="subject" v-model="subjects">
            <!-- <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option> -->
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
