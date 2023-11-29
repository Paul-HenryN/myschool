<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  // Ajoutez ici la logique de gestion de la soumission du formulaire
  console.log('Formulaire soumis !');
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
              <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
              <label for="password">Mot de passe :</label>
              <input type="password" id="password" v-model="password" required />
            </div>
            <br/>
            <div class="form-group">
              <div class="button">
                <router-link to="/login">
                  <button type="submit" >Se connecter</button>
                </router-link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Poppins-Bold';
  src: url('@/assets/static/font/Poppins-Bold.otf') format('woff2'); 
  font-weight: bold;
  font-style: bold;
}
@font-face {
  font-family: 'Poppins-Regular';
  src: url('@/assets/static/font/Poppins-Regular.otf') format('woff2'); 
  font-weight: bold;
  font-style: bold;
}
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
</style>

