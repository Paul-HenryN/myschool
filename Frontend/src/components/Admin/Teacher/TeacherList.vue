<script setup lang="ts">
import { redirectTo } from '@/main';
import axios from 'axios';
import { ref, defineProps, defineEmits, onMounted } from 'vue';

interface Teachers {
  id: number;
  name: string;
  email: string;
  subject: {
    id: number;
    name: string;
    coefficient: number;
  };
}

const emits = defineEmits();

const teachers = ref<Teachers[]>([]);

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
    const response = await axiosInstance.get(`http://localhost:3000/api/teachers`);
    teachers.value = response.data;
    teachers.value.sort((a, b) => a.name.localeCompare(b.name));
    console.log('Réponse de l\'API :', response.data);
  } catch (error) {
    // Gérez les erreurs ici
    console.error('Erreur lors de la récupération des administrateurs :', error);
    errors.value = 'Erreur lors de la récupération des administrateurs.';
    emits('onError', errors.value);
  }
});
</script>

<template>
  <div id="myfooter">
    <div id="text" class="container">
      <table>
        <thead>
          <tr>
            <th>Noms des enseignants</th>
            <th>Adresse mails des enseignants</th>
            <th>Matière enseignée</th>
            <th>Coefficient de la matière</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers">
            <td>{{ teacher.name }} </td>
            <td>{{ teacher.email }} </td>
            <td>{{ teacher.subject.name }} </td>
            <td>{{ teacher.subject.coefficient }} </td>
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
#text{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  text-align: center;
}
</style>
