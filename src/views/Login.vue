<template>
  <div>
    <TopBar :username="this.username" />
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
  mounted() {
    this.username = this.$store.getters.getUserName;
    this.username =
      this.username.charAt(0).toUpperCase() + this.username.slice(1);
  },
};
</script>
