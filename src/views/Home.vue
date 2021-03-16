<template>
  <v-container>
    <TopBar />
    <Cards class="mt-10" />
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

  beforeMount() {
    if (this.$store.getters.getToken.length === 0){
      this.$store.dispatch("userLogout");
    }
  }
};
</script>
