<template>
  <v-container fluid>
    <v-col cols="12" xl="2">
      <v-row class="pb-6 mt-4" align="center" justify="center">
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
        condition: "",
        Acards: [],
        Ecards: [],
    }
  },

  async beforeMount() {

    this.condition = this.$store.getters.getParam

    await this.getData()

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
    async getData() {
      try {

        let response = await auth.getCards("get-appointments");
        console.log(response)
        await this.saveAppointmentsData(response)
        

        if (this.$store.getters.getUserLevel === 0) {
          let exerciseResponse = await auth.getCards("get-exercises");
          console.log(exerciseResponse)
          await this.saveExerciseData(exerciseResponse)
        }

        console.log(this.Acards)
        console.log(this.Ecards)

      } catch (error) {
        if (error.response.data.state === "Token no valido"){
          await this.changeTokens()
        } else {
          this.$router.push({name: "error", params:{error: error.response.data.state}});
        }
      }
    },

    async saveAppointmentsData(response){
      for(let data in response.data.dataToShow) {
        var dataToShow = {title: String, date: String, hour: String, details: String}
        let info = response.data.dataToShow[data]

        if (this.user_level === 0){
          dataToShow.title = "CITA FISIOTERAPIA - " + info.Employee_name
        } else if (this.user_level === 1 || this.user_level === 2){
          dataToShow.title = "CITA FISIOTERAPIA - " + info.Patient_name
        }

        const date = new Date(info.date.substring(0,10) + " " + info.date.substring(11,16))
        const spRegionTime = new Date(date).toLocaleString(
          'eu-SP',
          {
            timeZone: 'GMT0',
          }
        );

        dataToShow.date = spRegionTime.substring(0,spRegionTime.indexOf(' '))
        dataToShow.hour = spRegionTime.substring(spRegionTime.indexOf(' '),spRegionTime.length-3)
        dataToShow.details = "Cita en la clinica FORTIA calle San Juan"

        this.Acards.push(dataToShow)
      }
    },

    async saveExerciseData(response){
      for(let data in response.data.dataToShow) {
        var dataToShow = {title: String, date: String, hour: String, details: String}
        let info = response.data.dataToShow[data]

        dataToShow.title = "EJERCICIO - " + info.Name

        
        const date = new Date(info.date.substring(0,10) + " " + info.date.substring(11,16))
        const spRegionTime = new Date(date).toLocaleString(
          'eu-SP',
          {
            timeZone: 'GMT0',
          }
        );

        dataToShow.date = spRegionTime.substring(0,spRegionTime.indexOf(' '))
        dataToShow.hour = spRegionTime.substring(spRegionTime.indexOf(' '),spRegionTime.length-3)
        dataToShow.details = info.Description

        this.Ecards.push(dataToShow)
      }
    },

    async changeTokens(){
      try{
        let response = await auth.getNewPairOfTokens(this.$store.getters.getRefreshToken)

        let accessToken = response.data.accessToken
        let refreshToken = response.data.refreshToken

        await this.$store
            .dispatch("tokensChange", { accessToken, refreshToken })
            .then(() => this.getData());
      } catch (error){
        this.$store.dispatch("userLogout");
      }
    }
  },

};
</script>