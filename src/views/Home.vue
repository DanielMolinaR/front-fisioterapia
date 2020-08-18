<template>
  <div>
    <TopBar :username="this.username" />
    <Cards :levelProp="this.userId" />
  </div>
</template>

<script>
import TopBar from "../components/MainBar.vue";
import Cards from "../components/HomeCards.vue";

export default {
  name: "home",

  components: {
    TopBar,
    Cards,
  },

  data() {
    return {
      userId: "",
      username: "",
    };
  },
  mounted() {
    this.userId = this.$store.getters.getUserId;
    this.username = this.$store.getters.getUserName;
    this.username = this.username.charAt(0).toUpperCase() + this.username.slice(1);
  },
};
</script>
