<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Students {
  id: number;
  name: string;
  email: string;
  grades: Grade[];
}

interface Grade {
  id: number;
  student_id: number;
  subject_id: number;
  value: number;
  subject: Subject; 
}

interface Subject {
  id: number;
  name: string;
  coefficient: number;
}

const students = ref<Students[]>([]);
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
    const response = await axiosInstance.get('http://localhost:3000/api/students');
    students.value = response.data;
    students.value.sort((a, b) => a.name.localeCompare(b.name));

    for (const student of students.value) {
      const gradesResponse = await axiosInstance.get(`http://localhost:3000/api/grades/${student.id}`);
      student.grades = gradesResponse.data;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des élèves :', error);
  }
});
</script>

<template>
  <div class="mytext container">
    <table>
      <thead>
        <tr>
          <th>Noms des élèves</th>
          <th>Adresse mails des élèves</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }} </td>
          <td>{{ student.email }} </td>
          <td>
            <ul>
              <li v-for="grade in student.grades" :key="grade.id">
                {{ grade.subject.name }}: {{ grade.value }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
ul{
  text-align: left;
}
</style>
