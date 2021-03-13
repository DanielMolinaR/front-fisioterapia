<template>
  <v-container>
    <TopBar />
    <signUpData class="mt-16" />
  </v-container>
</template>

<script>
import TopBar from "../components/SimpleTopBar.vue";
import signUpData from "../components/EmployeeSignUpData.vue";

export default {
  name: "eSignUp",

  components: {
    TopBar,
    signUpData,
  },
};
</script>
