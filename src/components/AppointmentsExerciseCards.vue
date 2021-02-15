<template>
  <v-container fluid>
    <v-col cols="12" xl="2">
      <v-row class="pb-6 mt-n8" align="center" justify="center">
          <v-btn-toggle v-model="toggle_exclusive" rounded >
          <v-btn value="appointments" @click="changeToAppointments">Mis citas</v-btn>
          <v-btn value="exercises" @click="changeToExercises">Mis ejercicios</v-btn>
          </v-btn-toggle>
      </v-row>
    </v-col>
    <v-row align="center" justify="center" v-if="this.condition === 'exercises' && user_level == 0">
        <v-col v-for="card in this.Ecards" :key="card.title" :cols="12" sm="6" md="6" lg="6" xl="4">
            <ExercisesCard :title= "card.title" :date= "card.date" :hour= "card.hour" :details="card.details"/>
        </v-col>
    </v-row>
    <v-row align="center" justify="center" v-if="this.condition === 'appointments'">
        <v-col v-for="card in this.Acards" :key="card.date" :cols="12" sm="6" md="6" lg="6" xl="4">
            <AppointmentsCard :title= "card.title" :date= "card.date" :hour= "card.hour" :details="card.details"/>
        </v-col>
    </v-row>
    <v-row align="right" justify="right" class="py-6" 
    v-if="user_level > 0 && this.condition === 'appointments'">
      <v-col>
        <v-card>
            <v-fab-transition>
            <v-btn color="#F5914D" dark absolute
              top right fab @click="dialog = !dialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <CreateAppointment/>
    </v-dialog>
    <v-row align="center" justify="center" class="py-5 mx-n8" 
    v-if="user_level > 0 && this.condition === 'exercises'">
      <v-col>
       <CreateExercise/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateExercise from "../components/CreateExercise"
import CreateAppointment from "../components/CreateAppointment"
import ExercisesCard from "../components/ExerciseCard.vue"
import AppointmentsCard from "../components/AppointmentCard.vue"
import auth from "../logic/Auth";

export default {

  props: {
    state: String,
    user_level: Number,
  },  

  components: {
      CreateExercise,
      CreateAppointment,
      ExercisesCard,
      AppointmentsCard
  },


  data () {
    return {
        dialog: false,
        toggle_exclusive: undefined,
        secondRoute: "",
        condition: "",
        Acards: [],
        Ecards: [
          {
            title: "Prueba",
            date: "12/09/2021",
            hour: "12:00",
            details: "nepe"
          }
        ],
    }
  },

  methods: {
    changeToExercises() {
      let param = "exercises"
      this.$store.dispatch("changeParam", {param})
      this.condition = this.$store.getters.getParam
      },
    changeToAppointments() {
      let param = "appointments"
      this.$store.dispatch("changeParam", {param})
      this.condition = this.$store.getters.getParam
    },
    async getData(route, first) {
      try {
        console.log("primer try")
        console.log("Con token: " +  this.$store.getters.getToken)
        let response = await auth.getCards(route);

        for(let data in response.data.dataToShow) {
          var dataToShow = {title: String, date: String, hour: String, details: String}
          let info = response.data.dataToShow[data]

          if (this.condition === "appointments"){
            dataToShow.title = "CITA FISIOTERAPIA - " + info.Employee_name
          } else if (this.condition === "exercises"){
            dataToShow.title = "EJERCICIO - " + info.Name
          }
          dataToShow.date = info.date.substring(0,10)
          dataToShow.hour = info.date.substring(11,16)
          if (this.condition === "exercises"){
            dataToShow.details = info.Description
          } else {
            dataToShow.details = "Cita en la clinica FORTIA calle San Juan"
          }

          this.saveData(first, dataToShow)
        }
      } catch (error) {
        console.log(error.response)
        if (error.response.data.state === "Token no valido"){
          console.log("token no valido")
          this.changeTokens()
        } else {
          console.log(error.response)
          console.log("esta aca")
          this.$router.push({name: "error", params:{error: error.response.data.state}});
        }
      }
    },

    saveData(first, dataToShow){
      if (first){
        if (this.condition === "appointments"){
          this.Acards.push(dataToShow)        
        } else if (this.condition === "exercises"){
          this.Ecards.push(dataToShow)        
        }
      } else {
        if (this.condition === "appointments"){
          this.Ecards.push(dataToShow)        
        } else if (this.condition === "exercises"){
          this.Acards.push(dataToShow)        
        }
      }
    },

    async changeTokens(){
      try{
        console.log("entra en el segundo try")
        let tokenResponse = await auth.getNewPairOfTokens(this.$store.getters.getRefreshToken)
        console.log(tokenResponse)
        console.log("Access token: " + tokenResponse.data.accessToken)
        console.log("Refresh Token: " + tokenResponse.data.refreshToken)
        let accessToken = tokenResponse.data.accessToken
        let refreshToken = tokenResponse.data.refreshToken
        await this.$store
            .dispatch("tokensChange", { accessToken, refreshToken })
            .then(() => this.$router.push("home"));
      } catch (error){
        console.log(this.$store.getters.getRefreshToken)
        console.log(error.response)
        console.log("esta aqui")
        this.$store.dispatch("userLogout");
      }
    }
  },

  beforeMount() {

    console.log("Hijo: " + this.$props.state)
    console.log("Hijo: " + this.$props.user_level)

    this.condition = this.$store.getters.getParam

    let firstRoute = ""
    if (this.condition === "appointments"){
      firstRoute = "get-appointments"
      if (this.user_level === 0){
        this.secondRoute = "get-exercises"
      }
    } else if (this.condition === "exercises"){
      firstRoute = "get-exercises"
      this.secondRoute = "get-appointments"
    }

    this.getData(firstRoute, true)

  },

  mounted() {
    this.getData(this.secondRoute, false)
  }


};
</script>