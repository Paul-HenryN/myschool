<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';


const emits = defineEmits();

const admins = ref([]);

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
    admins.value = response.data;
    console.log('Réponse de l\'API :', response.data);
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la récupération des administrateurs :', error);
    errors.value = 'Erreur lors de la récupération des administrateurs.';
    emits('onError', errors.value);
  }
});
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
  <div id="myfooter">
    <header>
      <div class="container first-bar">
        <div class="row">
          <div class="col-md-6 logo">
            <img src="@/assets/static/MY SCHOOL.png" alt="Logo MySchool" />
            <u>Administrateur</u>
          </div>
          <div class="col-md-6 user-info">
            Administrateur 001
          </div>
        </div>
      </div>
      <div class="second-bar">
        <select class="button" @change="handleAction">
          <option value="" disabled selected>Gérer les enseignants</option>
          <option value="ajoutEns">Ajouter</option>
          <option value="supprimer_enseignant">Supprimer</option>
          <option value="modifier_enseignant">Modifier</option>
          <option value="consulter_enseignant">Consulter</option>
        </select>
        <!-- <router-link to="/ajoutenseignant">
              Ajouter un enseignant
        </router-link> -->
        <select class="button" @change="handleAction">
          <option value="" disabled selected> Gérer les élèves</option>
          <option value="ajoutElev">Ajouter</option>
          <option value="supprimer_enseignant">Supprimer</option>
          <option value="modifier_enseignant">Modifier</option>
          <option value="consulter_enseignant">Consulter</option>
        </select>
        <select class="button" @change="handleAction">
          <option value="" disabled selected> Gérer l'administration</option>
          <option value="modAdmin">Modifier votre mot de passe</option>
          <option value="ajoutAdmin">Ajouter un administrateur</option>
          <option value="ListAdmin">Liste des administrateurs</option>
          <option value="SupAdmin">Supprimer un administrateur</option>
        </select>
      </div>
    </header>
    <div id="text" class="container">
      <table>
        <thead>
          <tr>
            <th>Adresse mails des administrateurs</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins">
            <td>{{ admin }}</td>
          </tr>
        </tbody>
      </table>
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
header{
  background-color: #fff;
}
.second-bar{
  background-color: #00367d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  border: 0 0 0 5px solid #000;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.75);
}
#myfooter{
  color: #00367d;
  font-family: 'Poppins-Regular', sans-serif;
  font-size: 13px; 
}
.logo{
    font-style: italic;
}
.user-info{
    text-align: right;
    padding-top: 13px;
    font-size: 15px; 
}
a {
  text-decoration: none; 
  color: white;          
  cursor: pointer;       
}
.button {
  background-color: #00367d;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 15px; 
}

.button:hover {
  background-color: #002855;
}

.button:active {
  background-color: #002855;
}

#text{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  text-align: center;
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
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  color: #36a5dd;
}

thead {
  background-color: #36a5dd;
  color: white;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
