<script setup lang="ts">
import { ref } from 'vue';

const isLoggedIn = ref(false);

function login() {
  // Code pour se connecter à l'application
  isLoggedIn.value = true;
}
</script>

<template>
  <div id="app" class="container-fluid" >
    <div class="row">
      <div class="col-md-9 logo">
        <img src="@/assets/static/MY SCHOOL BACK.png" alt="Logo de l'école" class="img-fluid" />
      </div>
      <div class="col-md-3 great">
        <div class="form">
          <h1 class="font">Bienvenue</h1>
          <p class="font1">Sur la plateforme web de l'école d'Ingénieurie numérique MYSCHOOL</p>
            <br/>
            <section class="content">
              <p class="font">Retrouvez l'ensemble de vos services via cette plateforme.</p>
            </section>
            <br/>
            <section class="button">
              <router-link to="/login">
                <button @click="login">Se connecter</button>
              </router-link>
            </section>
            <br/><br/>
          <p class="font4">
            <img src="@/assets/static/c-circle.svg" alt="Icône du copywriting" />
            Copyright 2023 Etablissement d'enseignement supérieur technique privé
          </p>
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
@font-face {
  font-family: 'Poppins-Thin';
  src: url('@/assets/static/font/Poppins-Thin.otf') format('woff2'); 
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
  align-items: center; /* Centrer verticalement */
  justify-content: center; /* Centrer horizontalement */
}
h1.font {
  font-family: 'Poppins-Bold', sans-serif;
  text-align: center;
  font-size: 35px; 
  color: #00367d;
}
p.font{
  font-family: 'Poppins-Regular', sans-serif;
  text-align: center;
  font-size: 15px; 
  color: #00367d;
}
p.font1{
  font-family: 'Poppins-Thin', sans-serif;
  text-align: center;
  font-style: italic;
  font-size: 13px; 
  color: #00367d;
}
.button {
  display: flex;
  justify-content: center; 
  align-items: center; 
}
.button button {
  background-color: #00367d; 
  color: #ffffff; 
  padding: 10px 20px; 
  border-radius: 5px; 
  border: none; 
  cursor: pointer; 
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0); 
  transition: background-color 0.3s ease; 
}
.button button:hover {
  background-color: #36a5dd; 
}
p.font4{
  font-family: 'Poppins-Thin', sans-serif;
  font-size: 12px; 
  color: #000;
}
</style>

