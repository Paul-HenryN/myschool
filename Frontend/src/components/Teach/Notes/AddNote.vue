<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Student {
  id: number;
  name: string;
  grade: number | null;
}

const students = ref<Student[]>([]);
const success = ref('');
const error = ref('');

const fetchStudents = async () => {
  try {
    const response = await axios.get<Student[]>('http://localhost:3000/api/students');
    students.value = response.data.map(student => ({ ...student, grade: null }));
  } catch (err) {
    console.error('Erreur lors de la récupération des élèves:', err);
    error.value = 'Erreur lors de la récupération des élèves.';
  }
};

const handleSubmit = async (studentId: number, grade: number | null) => {
  try {
    if (grade === null || isNaN(grade) || grade < 0 || grade > 20) {
      error.value = 'Veuillez saisir une note valide.';
      return;
    }

    const teacherId = localStorage.getItem('teacherId');

    if (!teacherId) {
      error.value = 'Erreur d\'authentification de l\'enseignant.';
      return;
    }

    const responseSubject = await axios.get(`http://localhost:3000/api/teachers/${teacherId}`);
    const subjectId = responseSubject.data.subject.id;

    const data = {
      studentId,
      subjectId,
      value: grade,
    };

    const response = await axios.post('http://localhost:3000/api/grades', data);

    success.value = 'Note enregistrée avec succès.';
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement de la note, vous avez déjà noté cet élève :', err);
    error.value = 'Erreur lors de l\'enregistrement de la note, vous avez déjà noté cet élève.';
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
            <th>Note</th>
            <th>Enregistrer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>
              <input type="number" v-model="student.grade" step="0.1" min="0" max="20" />
            </td>
            <td>
              <button @click="handleSubmit(student.id, student.grade)">Enregistrer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="success" class="success">{{ success }}</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez vos styles CSS ici */
</style>
