<template>
  <v-container>
    <TopBar/>
    <Card class="pa-16"></Card>
  </v-container>
</template>

<script>
import TopBar from "../components/MainBar.vue";
import Card from "../components/AppointmentsExerciseCards.vue"

export default {
  name: "appointments-exercise",

  components: {
    TopBar,
    Card
  },
};
</script>
