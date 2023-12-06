<script lang="ts">

</script>

<template>
  <div id="myfooter">
    <footer class="text-center">
      <div class="container">
        <div class="row">
          <div class="col-md-4 foot">
            <p class="left">
              <strong><h6>Suivez-nous</h6></strong>            
              <img src="@/assets/static/facebook.svg" alt="Icône" class="icon"/>
              <a href="#" target="_blank"> Suivez myschool sur Facebook</a><br/>
              <img src="@/assets/static/twitter.svg" alt="Icône" class="icon"/>
              <a href="#" target="_blank"> Suivez myschool sur Twitter</a><br/>
              <img src="@/assets/static/linkedin.svg" alt="Icône" class="icon"/>
              <a href="#" target="_blank"> Suivez myschool sur LinkedIn</a><br/>
            </p>
          </div>
          <div class="col-md-4 foot">
            <p>
              <strong><h6>Calendrier Scolaire</h6></strong>
              <img src="@/assets/static/clipboard-check-fill.svg" alt="Icône" class="icon"/>
              Vacances d'été : 1er juillet - 31 août<br/>
              <img src="@/assets/static/clipboard-check-fill.svg" alt="Icône" class="icon"/>
              Rentrée scolaire : 1er septembre<br/>
              <img src="@/assets/static/clipboard-check-fill.svg" alt="Icône" class="icon"/>
              Journée Portes Ouvertes : 15 octobre<br/>
            </p>
          </div>
          <div class="col-md-4 foot">
            <p>
              <strong><h6>Contact</h6></strong>
              <img src="@/assets/static/envelope-at-fill.svg" alt="Icône" />
              contact@example.com<br/>
              <img src="@/assets/static/telephone-fill.svg" alt="Icône" />
              +1 (555) 123-4567<br/>
              <img src="@/assets/static/geo-alt-fill.svg" alt="Icône" class="icon"/>
              123 Main Street, City, Country
            </p>
          </div>
        </div>
      </div>
      <div class="end">
        <hr/>
        <img src="@/assets/static/c-circle.svg" alt="Icône du copywriting" />
        2023 MYSCHOOL
      </div>
    </footer>
  </div>
  
</template>

<style scoped>
#myfooter{
  display: flex;
  flex-direction: column;
  min-height: 50vh;
}
.foot{
  font-family: 'Poppins-Regular', sans-serif;
  text-align: left;
  font-size: 13px; 
  color: #fff;
  background-color: #36a5dd;
}
footer{
  background-color: #36a5dd;
  margin-top: auto;
}
strong{
  color: #00367d;
}
.end{
  font-family: 'Poppins-Regular', sans-serif;
  background-color: #00367d;
  color: #000;
}
.left{
  margin-left: 20px;
}
a {
  text-decoration: none; 
  color: white;          
  cursor: pointer;       
}
</style>
