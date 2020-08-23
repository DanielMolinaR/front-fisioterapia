<template>
  <div>
    <TopBar />
    <LoginCard/>
  </div>
</template>

<script>
import TopBar from "../components/LoginBar.vue";
import LoginCard from "../components/Login.vue"

export default {
  name: "login",

  components: {
    TopBar,
    LoginCard,
  },

  data() {
    return {
      username: "",
    };
  },
};
</script>
