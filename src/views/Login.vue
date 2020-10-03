<template >
  <div >
    <v-row>
      <TopBar/>
    </v-row>
    <v-row justify="center" align="center" class = "pb-16 pt-12">
      <v-img 
        class="mb-n16"
        src= '../assets/images/logo_fisioterapia_sintexto.png'
        max-width= "350px"
        max-height="180px"
      ></v-img>
    </v-row>
    <v-row justify="center" style="padding-top: 90px ">
      <LoginCard class="pt-16"/>  
    </v-row>
  </div>
</template>

<script>
import TopBar from "../components/LoginBar.vue";
import LoginCard from "../components/LoginCard.vue"

export default {
  name: "login",

  components: {
    TopBar,
    LoginCard,
  },

};
</script>

