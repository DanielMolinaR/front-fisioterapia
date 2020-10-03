<template>
  <div>
    <TopBar :username="this.username" />
    <Cards/>
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
};
</script>
