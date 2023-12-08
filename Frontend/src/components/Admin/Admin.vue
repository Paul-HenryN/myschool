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
  <div class="mytext">

    <div class="text container">
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

.logo{
    font-style: italic;
}
.user-info{
    text-align: right;
    padding-top: 13px;
    font-size: 15px; 
}

</style>
