<template>
  <div>
    <TopBar/>
    <Users class="px-10 pt-14"/>
  </div>
</template>

<script>
import TopBar from "../components/MainBar.vue";
import Users from "../components/UsersItems.vue";

export default {
  name: "users",

  components: {
    TopBar,
    Users,
  },
};
</script>