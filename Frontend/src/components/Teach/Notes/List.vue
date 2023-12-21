<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Student {
  id: number;
  name: string;
  email: string;
  grade: number | null;
}

const students = ref<Student[]>([]);
const success = ref('');
const error = ref('');

const fetchStudents = async () => {
  try {
    const response = await axios.get<Student[]>('http://localhost:3000/api/students');
    students.value = response.data.map(student => ({ ...student, grade: null }));
    students.value.sort((a, b) => a.name.localeCompare(b.name));

    // Fetch grades for each student
    await Promise.all(students.value.map(student => fetchStudentGrade(student)));
  } catch (err) {
    console.error('Erreur lors de la récupération des élèves:', err);
    error.value = 'Erreur lors de la récupération des élèves.';
  }
};

const fetchStudentGrade = async (student: Student) => {
  try {
    const teacherId = localStorage.getItem('teacherId');

    if (!teacherId) {
      console.error('Erreur d\'authentification de l\'enseignant.');
      return;
    }

    const responseSubject = await axios.get(`http://localhost:3000/api/teachers/${teacherId}`);
    const subjectId = responseSubject.data.subject.id;

    const responseGrade = await axios.get(`http://localhost:3000/api/grades/${student.id}/${subjectId}`);

    if (responseGrade.data.error && responseGrade.data.error === 'Note non trouvée') {
      // Set grade to null if no grade is found
      student.grade = null;
    } else {
      student.grade = responseGrade.data.value;
    }
  } catch (err) {
    console.error('Erreur lors de la récupération de la note :', err);
  }
};

onMounted(() => {
  fetchStudents();
});
</script>

<template>
  <div class="mytext">
    <div class="text container">
      <table>
        <thead>
          <tr>
            <th>Nom de l'élève</th>
            <th>Adresse mail</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.grade }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="success" class="success">{{ success }}</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
</style>
s