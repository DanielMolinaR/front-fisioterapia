<template>
  <div>
    <TopBar/>
    <Card class="pa-16"></Card>
  </div>
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
