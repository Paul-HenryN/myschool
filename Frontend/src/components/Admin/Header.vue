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
  <div class="mytext">
    <header>
      <div class="container first-bar">
        <div class="row">
          <div class="col-md-6 logo">
            <img src="@/assets/static/MY SCHOOL.png" alt="Logo MySchool" />
            Administrateur
          </div>
          <div class="col-md-6 user-info">
            Bienvenue dans votre interface
          </div>
        </div>
      </div>
      <div class="second-bar">
        <select class="button" @change="handleAction">
          <option value="" disabled selected> Gérer les enseignants</option>
          <option value="ListEns">Liste des enseignants</option>
        </select>
        <select class="button" @change="handleAction">
          <option value="" disabled selected> Gérer les élèves</option>
          <option value="ListEle">Liste des élèves</option>
        </select>
        <select class="button" @change="handleAction">
          <option value="" disabled selected> Gérer les cours</option>
          <option value="ajoutcours">Ajouter un cours</option>
          <option value="Listcours">Liste des cours</option>
          <option value="Supcours">Supprimer un cours</option>
          <option value="modcours">Modifier cours</option>
        </select>
        <select class="button" @change="handleAction">
          <option value="" disabled selected> Gérer les utilisateurs</option>
          <option value="ListAdmin">Liste des utilisateurs</option>
          <option value="ajoutAdmin">Ajouter un utilisateur</option>
          <option value="SupAdmin">Supprimer un utilisateur</option>
          <option value="modAdmin">Modifier mot de passe</option>
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
