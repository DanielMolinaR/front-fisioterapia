<template>
  <v-container>
    <TopBar/>
    <Users class="px-10 pt-14" :state="this.state" :user_level="this.userLevel"/>
  </v-container>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import Users from "../components/UsersItems.vue";

export default {
  name: "users",

  components: {
    TopBar,
    Users,
  },

  data () {
    return{
      route: this.$route.params.toSearch,
      state: "",
      userLevel: 0,
    }
  },

  async beforeMount(){
    if (Object.keys(this.$route.params).length !== 0){
      if (this.route.includes("patients")){
        let param = "patients"
        await this.$store.dispatch("changeParam", {param})
      } else if (this.route.includes("employees")){
        let param = "employees"
        await this.$store.dispatch("changeParam", {param})
      } 
    }

    this.state = this.$store.getters.getParam
    this.userLevel = this.$store.getters.getUserLevel

  }


};
</script>