<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

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

interface Student {
  id: number;
  name: string;
  email: string;
  grades: Grade[] | null;
}

const studentId = localStorage.getItem('studentId');
const student = ref<Student | null>(null);
const success = ref('');
const error = ref('');

const fetchStudent = async () => {
  try {
    if (!studentId) {
      console.error('ID de l\'étudiant non défini.');
      return;
    }

    const responseStudent = await axios.get<Student>(`http://localhost:3000/api/students/${studentId}`);
    student.value = responseStudent.data;

    const responseGrades = await axios.get<Grade[]>(`http://localhost:3000/api/grades/${studentId}`);
    student.value.grades = responseGrades.data;

    await Promise.all(student.value.grades.map(grade => fetchSubjectInfo(grade.subject_id, grade)));
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'étudiant et de ses notes :', err);
    error.value = 'Erreur lors de la récupération de l\'étudiant et de ses notes.';
  }
};

const fetchSubjectInfo = async (subjectId: number, grade: Grade) => {
  try {
    const responseSubject = await axios.get<Subject>(`http://localhost:3000/api/subjects/${subjectId}`);
    grade.subject = responseSubject.data;
  } catch (err) {
    console.error('Erreur lors de la récupération des informations sur la matière :', err);
  }
};

onMounted(() => {
  fetchStudent();
});
</script>

<template>
  <div class="mytext">
    <div class="text container">
      <table v-if="student && student.grades">
        <thead>
          <tr class="name" v-if="student">
            Notes de {{ student.name }}
          </tr>
          <tr>
            <th>Matière</th>
            <th>Note sur 20</th>
            <th>Coefficient</th>
            <th>Note avec le coefficient</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grade in student?.grades || []" :key="grade.id">
            <td>{{ grade.subject?.name || 'Matière inconnue' }}</td>
            <td>{{ grade.value }}/20</td>
            <td>{{ grade.subject?.coefficient || 'N/A' }}</td>
            <td>{{ (grade.value * (grade.subject?.coefficient || 1)).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="success" class="success">{{ success }}</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
.name{
  background-color: #00367d;
}
</style>
