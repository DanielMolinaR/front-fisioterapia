<template>
  <v-container>
    <TopBar />
    <signUpData />
  </v-container>
</template>

<script>
import TopBar from "../components/SimpleTopBar.vue";
import signUpData from "../components/PatientSignUpData.vue";

export default {
  name: "signUp",

  components: {
    TopBar,
    signUpData,
  },
};
</script>
