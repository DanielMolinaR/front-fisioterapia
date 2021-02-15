<template>
  <div>
    <TopBar/>
    <Calendar class="px-10" :user_level="this.userLevel"/>
  </div>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import Calendar from "../components/calendarComponent"
import auth from "../logic/Auth";

export default {
  name: "calendar",

  components: {
    TopBar,
    Calendar,
  },

  data () {
    return {
      appointments: [],
      exercises: [],
      userLevel: this.$store.getters.getUserLevel,
    }
  },

  methods: {
    async getData(route, isAppointment){
      try {
        let response = await auth.getCards(route);
        for(let data in response.data.dataToShow) {
          var dataToShow = {title: String, date: String, hour: String, details: String}
          let info = response.data.dataToShow[data]

          if (isAppointment){
            dataToShow.title = "CITA FISIOTERAPIA - " + info.Employee_name
          } else if (!isAppointment){
            dataToShow.title = "EJERCICIO - " + info.Name
          }
          dataToShow.date = info.date.substring(0,10)
          dataToShow.hour = info.date.substring(11,16)
          if (!isAppointment){
            dataToShow.details = info.Description
          } else {
            dataToShow.details = "Cita en la clinica FORTIA calle San Juan"
          }
          if (isAppointment){
            this.appointments.push(dataToShow)
          } else {
            this.exercises.push(dataToShow)
          }
        }
      } catch (error) {
        console.log(error.response)
        if (error.response.data.state === "Token no valido"){
          console.log("token no valido")
          try{
            console.log("entra en el try")
            let tokenResponse = await auth.getNewPairOfTokens(this.$store.getters.getRefreshToken)
            console.log(tokenResponse)
            let accessToken = tokenResponse.data.accessToken
            let refreshToken = tokenResponse.data.refreshToken
            await this.$store
                .dispatch("tokensChange", { accessToken, refreshToken })
                .then(() => this.$router.push({name: "appointments-exercise", params:{toSearch: this.condition}}));
          } catch (error){
            console.log(error.response)
            this.$store.dispatch("userLogout");
          }
        } else {
          console.log(error.response)
          this.$router.push({name: "error", params:{error: error.response.data.state}});
        }
      }
    }
  },

  beforeMount() {
    if (this.userLevel > 1){
      this.getData("get-all-appointments", true)
      this.getData("get-all-exercises", false)
    } else {
      this.getData("get-appointments", true)
      this.getData("get-exercises", false)
    }
  }

};
</script>