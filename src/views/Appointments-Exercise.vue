<template>
  <v-container>
    <TopBar/>
    <Card class="pa-16" :state="state" :user_level="userLevel"></Card>
  </v-container>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import Card from "../components/AppointmentsExerciseCards.vue"

export default {
  name: "appointments-exercise",

  components: {
    TopBar,
    Card
  },

    data () {
    return{
      route: this.$route.params.toSearch,
      state: "",
      userLevel: 0,
    }
  },

 async beforeMount() {

    if (Object.keys(this.$route.params).length !== 0){
      if (this.route.includes("appointments")){
        let param = "appointments"
        await this.$store.dispatch("changeParam", {param})
      } else if (this.route.includes("exercises")){
        let param = "exercises"
        await this.$store.dispatch("changeParam", {param})
      } 
    }

    this.state = this.$store.getters.getParam
    this.userLevel = this.$store.getters.getUserLevel
  },
};
</script>
