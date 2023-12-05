<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits } from 'vue';


const emits = defineEmits();

const email = ref('');
const remail = ref('');
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

const handleSubmit = async () => {
  try {
    if (email.value !== remail.value) {
      errors.value = 'Les deux emails ne sont pas identiques.';
      return;
    }

    const response = await axiosInstance.delete(`http://localhost:3000/api/user/${encodeURIComponent(email.value)}`, {
    });
    console.log('Réponse de l\'API :', response.data);
    success.value = 'Si un administrateur avec ce mail a été trouvé dans la base de donné, il a été suprimé avec succès.';
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la suppression :', error);
    errors.value = 'Erreur lors de la suppression.';
    emits('onError', errors.value);
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
      <p> 
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Veuillez saisir l'adresse mail de l'administrateur à supprimer:</label>
            <input class="input" type="name" id="name" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="name">Veuillez resaisir l'adresse mail de l'administrateur à supprimer:</label>
            <input class="input" type="name" id="name" v-model="remail" required/>
          </div>

          <div class="form-group">
          <div class="button">
            <button type="submit"  >Valider</button>
          </div>
          </div>

          <div v-if="email!=remail" class="error">le deux mail entrées ne sont pas identiques</div>
          <div v-if="success" class="success">{{ success }}</div>
          <div v-if="errors" class="error">{{ errors }}</div>
        </form>
      </p>
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
.button, button {
  background-color: #00367d;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-size: 15px; 
}
.button {
  display: flex;
  justify-content: center; 
  align-items: center; 
}

button:hover {
  background-color: #36a5dd;
}

.button:active {
  background-color: #002855;
}

#text{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  text-align: left;
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
</style>
