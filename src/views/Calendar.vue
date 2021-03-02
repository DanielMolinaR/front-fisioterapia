<template>
  <div>
    <TopBar/>
    <Calendar class="px-10" :user_level="userLevel" :eventsDataToIterate="eventsData" :keyComponent="key"/>
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
      eventsData: [],
      userLevel: this.$store.getters.getUserLevel,
      key: false
    }
  },

  async created() {
    await this.getCalendarData()
    console.log("HA TERMINADO EL CREATED")
    this.key = true
    console.log(this.key)
  },
  
  methods: {
    async getCalendarData() {
      try {
        let response
        if (this.userLevel === 2){
          response = await auth.getCards("get-all-appointments");
        } else if (this.userLevel >= 0 && this.userLevel < 2) {
          response = await auth.getCards("get-appointments");
        }
        console.log(response)
        await this.saveAppointmentsData(response)

        if (this.userLevel === 0) {
          var exerciseResponse = await auth.getCards("get-exercises");
          console.log(exerciseResponse)
          await this.saveExerciseData(exerciseResponse)
        }

        console.log(this.eventsData)

      } catch (error) {
        console.log(error.response)
        if (error.response.data.state === "Token no valido"){
          await this.changeTokens()
        } else {
          this.$router.push({name: "error", params:{error: error.response.data.state}});
        }
      }
    },

    async saveAppointmentsData(response){
      for(let data in response.data.dataToShow) {
        console.log("Bucle citas")
        var dataToShow = {title: String, date: String, hour: String, details: String}
        let info = response.data.dataToShow[data]

        if (this.userLevel === 0){
          dataToShow.title = "CITA FISIOTERAPIA - " + info.Employee_name
        } else if (this.userLevel === 1 || this.userLevel === 2){
          dataToShow.title = "CITA FISIOTERAPIA - " + info.Patient_name
        }

        dataToShow.date = info.date.substring(0,10)
        dataToShow.hour = info.date.substring(11,16)

        console.log(this.eventsData)
        
        dataToShow.details = "Cita en la clinica FORTIA calle San Juan"

        this.eventsData.push(dataToShow)
      }
    },

    async saveExerciseData(response){
      for(let data in response.data.dataToShow) {
        console.log("Bucle ejercicios")
        var dataToShow = {title: String, date: String, hour: String, details: String}
        let info = response.data.dataToShow[data]

        dataToShow.title = "EJERCICIO - " + info.Name
        dataToShow.date = info.date.substring(0,10)
        dataToShow.hour = info.date.substring(11,16)
        dataToShow.details = info.Description

        this.eventsData.push(dataToShow)
      }
    },

    async changeTokens(){
      try{
        console.log("intenta coger los nuevos token¿?¿?")
        let response = await auth.getNewPairOfTokens(this.$store.getters.getRefreshToken)

        let accessToken = response.data.accessToken
        let refreshToken = response.data.refreshToken

        await this.$store
            .dispatch("tokensChange", { accessToken, refreshToken })
            .then(() => this.getCalendarData());
      } catch (error){
        this.$store.dispatch("userLogout");
      }
    }
  },


};
</script>