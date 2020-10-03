<template>
  <div>
    <TopBar/>
    <Card class="pa-16"></Card>
  </div>
</template>

<script>
import TopBar from "../components/MainBar.vue";
import Card from "../components/AppointmentsCard.vue"

export default {
  name: "appointments",

  components: {
    TopBar,
    Card
  },
};
</script>
