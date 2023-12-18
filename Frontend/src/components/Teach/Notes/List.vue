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
      <table>
        <thead>
          <tr>
            <td>
              Noms de l'élève
            </td>
            <td>
              Notes
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers">
            <td>{{ teacher }}</td>
            <td>{{ teacher }}</td>
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
