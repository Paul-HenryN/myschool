<script setup lang="ts">
import axios from 'axios';
import { ref, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps(['onLogin']);
const emits = defineEmits();

const email = ref('');
const password = ref('');
const router = useRouter();

const isAdmin = ref(false);
const isTeacher = ref(false);
const isStudent = ref(false);

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
    let response;

    if (isAdmin.value) {
      response = await axiosInstance.post('http://localhost:3000/api/user/login', {
        email: email.value,
        password: password.value,
      });
      const token = response.data.token;
      console.log('Réponse de l\'API :', response.data);
      localStorage.setItem('token', token);
      console.log('Redirection vers /admin');
      router.push('/admin');
      emits('onLogin', response.data);
      return;
    }else if (isTeacher.value) {
      response = await axiosInstance.post('http://localhost:3000/api/teacher/login', {
        email: email.value,
        password: password.value,
      });
      console.log('Réponse de l\'API (enseignant) :', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      router.push('/enseignant');
      emits('onLogin', response.data);
      return;
    }else if (isStudent.value) {
      response = await axiosInstance.post('http://localhost:3000/api/student/login', {
        email: email.value,
        password: password.value,
      });
      console.log('Réponse de l\'API (élève) :', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      router.push('/eleve');
      emits('onLogin', response.data);
    } else {
      // Aucune correspondance trouvée pour le type d'utilisateur
      console.error('Aucune correspondance trouvée pour le type d\'utilisateur.');
      errors.value = 'Erreur de connexion. Veuillez vérifier vos informations.';
      emits('onError', errors.value);
      return;
    }
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la connexion :', error);
    errors.value = 'Erreur de connexion. Veuillez vérifier vos informations.';
    emits('onError', errors.value);
  }
};

</script>

<template>
  <div id="app" class="container-fluid" >
    <div class="row">
      <div class="col-md-9 logo">
        <img src="@/assets/static/MY SCHOOL BACK.png" alt="Logo de l'école" class="img-fluid" />
      </div>
      <div class="col-md-3 great">
        <div class="form">
          <h1>Connexion</h1>
          <br/>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">Email :</label>
              <input class="input" type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
              <label for="password">Mot de passe :</label>
              <input class="input" type="password" id="password" v-model="password" required />
            </div>

            <div class="form-group checkboxes">
              <input type="checkbox" id="isAdmin" v-model="isAdmin" />
              <label for="isAdmin">Admin</label>
              <input type="checkbox" id="isTeacher" v-model="isTeacher" />
              <label for="isTeacher">Enseignant</label>
              <input type="checkbox" id="isStudent" v-model="isStudent" />
              <label for="isStudent">Étudiant</label>
            </div>

            <div class="form-group">
              <div class="button">
                  <button type="submit" >Valider</button>
              </div>
            </div>

            <div v-if="errors" class="error">{{ errors }}</div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
    width: 100%;
    height: 100%;
    background-color: #36a5dd;
}
.logo img {
  width: 100%;
  height: 100vh; 
  object-fit: cover; 
  margin: 0; 
  padding: 0; 
}
.great {
  background-color: #fff;
  display: flex;
  align-items: center; 
  justify-content: center; 
  font-family: 'Poppins-Regular', sans-serif;
  font-size: 15px; 
  color: #00367d;
}
h1 {
  text-align: center;
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 35px; 
  color: #00367d;
}

form {
  max-width: 400px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 15px;
}
.input {
  font-size: 13px; 
}
label {
  display: block;
  margin-bottom: 5px;
  color: #00367d;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  background-color: #00367d;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button {
  display: flex;
  justify-content: center; 
  align-items: center; 
}

button:hover {
  background-color: #36a5dd;
}

.checkboxes {
  display: flex;
  align-items: center;
}

.checkboxes label {
  margin-right: 10px; /* Marge entre les labels */
}
</style>

