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
        <v-col v-for="card in this.Ecards" :key="card.title" :cols="12" sm="6" md="4">
            <ExercisesCard :title= "card.title" :date= "card.date" :hour= "card.hour" :details="card.details"/>
        </v-col>
    </v-row>
    <v-row align="center" justify="center" v-if="this.condition === 'appointments'">
        <v-col v-for="card in this.Acards" :key="card.date" :cols="12" sm="6" md="4">
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
  },

  beforeMount() {
    let appointmentsToShow = []
    let exercisesToShow = [ //beforemount cogere los datos del path desde el que me vengan y en el mounted los otros
      {
          title: "CITA FISIOTERAPIA - ALEJANDRO RUBIO",
          date: "24/10/2020",
          hour: "10:00",
          details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
      },
    ];

    console.log("Hijo: " + this.$props.state)
    console.log("Hijo: " + this.$props.user_level)

    this.condition = this.$props.state

    /*let firstRoute = ""
    if (this.condition === "appointments"){
      firstRoute = "get-appointments"
      if (this.user_level === 0){
        this.secondRoute = "get-exercises"
      }
    } else if (this.condition === "exercises"){
      firstRoute = "get-exercises"
      this.secondRoute = "get-appointments"
    }

    try {
      let response = await auth.getCards(firstRoute);
      console.log("Respuesta: " + response)

      let dataToShow = {title: String, date: String, hour: String, details: String}

      for(let cita in response.data.dataToShow) {
        let data = response.data.dataToShow[cita]
        console.log("cita: " + data)
        if (this.condition === "appointments"){
          dataToShow.title = "CITA FISIOTERAPIA - " + data.Employee_name
        } else if (this.condition === "exercises"){
          dataToShow.title = "EJERCICIO - " + data.Employee_name
        }
        dataToShow.date = data.date.substring(0,10)
        dataToShow.hour = data.date.substring(11,16)
        if (this.condition === "exercises"){
          dataToShow.title = data.details
        } else {
          dataToShow.details = "Cita en la clinica FORTIA calle San Juan"
        }
        console.log(dataToShow)
        appointmentsToShow.push(dataToShow)
      }
      console.log("tamaño del array: " + appointmentsToShow.length)
      console.log("array: " + appointmentsToShow[2].title)
    } catch (error) {
      console.log(error.response)
    }*/

    this.Acards = appointmentsToShow,
    //console.log("tamaño del array: " + this.Acards.length)
    //console.log("array: " + this.Acards[3].title)
    this.Ecards = exercisesToShow

  },
};
</script>