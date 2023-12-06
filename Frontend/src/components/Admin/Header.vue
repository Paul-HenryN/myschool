<script setup lang="ts">
import { redirectTo } from '@/main';

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
          <option value="" disabled selected> Gérer les enseignants</option>
          <option value="ajoutEns">Ajouter un enseignant</option>
          <option value="ListEns">Liste des enseignants</option>
          <option value="SupEns">Supprimer un enseignant</option>
          <option value="modEns">Modifier l'enseignant</option>
        </select>
        <select class="button" @change="handleAction">
          <option value="" disabled selected> Gérer les élèves</option>
          <option value="ajoutEle">Ajouter un élève</option>
          <option value="ListEle">Liste des élèves</option>
          <option value="SupEle">Supprimer un élève</option>
          <option value="modEle">Modifier l'élève</option>
        </select>
        <select class="button" @change="handleAction">
          <option value="" disabled selected> Gérer l'administration</option>
          <option value="modAdmin">Modifier votre mot de passe</option>
          <option value="ajoutAdmin">Ajouter un administrateur</option>
          <option value="ListAdmin">Liste des administrateurs</option>
          <option value="SupAdmin">Supprimer un administrateur</option>
        </select>
      </div>
    </header>  
  </div>
  
</template>

<style scoped>
img{
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
