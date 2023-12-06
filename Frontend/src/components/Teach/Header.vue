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
            <u>Administrateur</u>
          </div>
          <div class="col-md-6 user-info">
            Administrateur 001
          </div>
        </div>
      </div>
      <div class="second-bar">
        <select class="button" @change="handleAction">
          <option value="" disabled selected> Gérer les élèves</option>
          <option value="addNot">Noter les élèves</option>
          <option value="modNot">Modifier une note</option>
          <option value="list">Liste des élèves</option>
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
.icon{
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
