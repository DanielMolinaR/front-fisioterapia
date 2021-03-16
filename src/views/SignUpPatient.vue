<template>
  <v-container>
    <TopBar />
    <PatientSignUpData />
  </v-container>
</template>

<script>
import TopBar from "../components/SimpleTopBar.vue";
import PatientSignUpData from "../components/PatientSignUpData.vue";

export default {
  name: "signUp",

  components: {
    TopBar,
    PatientSignUpData,
  },
};
</script>
