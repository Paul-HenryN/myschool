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

    const response = await axiosInstance.delete(`http://localhost:3000/api/teacher/${encodeURIComponent(email.value)}`, {
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
  <div class="mytext">
    <div class="text container">
      <p> 
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Veuillez saisir l'adresse mail de l'enseignant à supprimer:</label>
            <input class="input" type="name" id="name" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="name">Veuillez resaisir l'adresse mail de l'enseignant à supprimer:</label>
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

</style>
