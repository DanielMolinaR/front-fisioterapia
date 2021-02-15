<template>
  <v-container>
    <TopBar />
    <Cards />
  </v-container>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import Cards from "../components/HomeCards.vue";

export default {
  name: "home",

  components: {
    TopBar,
    Cards,
  },

  async beforeMount(){
    console.log("Se ha guardado el refresh token: " + this.$store.getters.getRefreshToken)
  }

};
</script>
