<template>
  <v-container>
    <TopBar />
    <signUpData />
  </v-container>
</template>

<script>
import TopBar from "../components/SimpleTopBar.vue";
import signUpData from "../components/patientSignUpData.vue";

export default {
  name: "signUp",

  components: {
    TopBar,
    signUpData,
  },
};
</script>
