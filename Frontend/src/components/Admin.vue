<script lang="ts">
import { defineComponent } from 'vue';
import { redirectTo } from '@/main'; // Importez la fonction de redirection

export default defineComponent({
  methods: {
    handleAction(event: Event) {
      const selectedOption = (event.target as HTMLSelectElement).value;

      // Vérifiez quelle option a été sélectionnée
      if (selectedOption) {
        // Passez la valeur sélectionnée à la fonction redirectTo
        redirectTo(selectedOption);
      }
    },
  },
});
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
          <option value="ajouter_enseignant">Ajouter</option>
          <option value="supprimer_enseignant">Supprimer</option>
          <option value="modifier_enseignant">Modifier</option>
          <option value="consulter_enseignant">Consulter</option>
        </select>
      </div>
    </header>
    <div id="text" class="container">
      <p>
        <h1>Bienvenue à MySchool!!!</h1> 
        Un lieu d'apprentissage inspirant dédié à l'excellence éducative. 
        Chez MySchool, nous nous engageons à offrir une éducation de qualité, axée sur le développement intégral 
        de chaque élève. Notre équipe passionnée de professionnels de l'éducation travaille avec dévouement pour 
        créer un environnement stimulant, favorisant la curiosité intellectuelle, la créativité, et l'épanouissement 
        personnel. Une aventure éducative exceptionnelle à MySchool, où chaque élève compte et où l'apprentissage 
        devient une expérience enrichissante.
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
.button {
  background-color: #00367d;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 15px; 
}

.button:hover {
  background-color: #002855;
}

.button:active {
  background-color: #002855;
}

#text{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  text-align: center;
}
</style>
