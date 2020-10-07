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
    <v-row align="center" justify="center" v-if="exercises && this.$store.getters.getUserLevel == 0">
        <v-col v-for="card in this.Ecards" :key="card.title" :cols="12" sm="6" md="4">
            <ExercisesCard :title= "card.title" :date= "card.date" :hour= "card.hour" :details="card.details"/>
        </v-col>
    </v-row>
    <v-row align="center" justify="center" v-if="appointments">
        <v-col v-for="card in this.Acards" :key="card.title" :cols="12" sm="6" md="4">
            <AppointmentsCard :title= "card.title" :date= "card.date" :hour= "card.hour" :details="card.details"/>
        </v-col>
    </v-row>
    <v-row align="right" justify="right" class="py-6" 
    v-if="this.$store.getters.getUserLevel > 0 && appointments">
      <v-col>
        <v-card>
            <v-fab-transition>
            <v-btn color="#7ED957" dark absolute
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
    v-if="this.$store.getters.getUserLevel > 0 && exercises">
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

    components: {
        CreateExercise,
        CreateAppointment,
        ExercisesCard,
        AppointmentsCard
    },


  data () {

    return {
        appointments: false,
        exercises: false,
        dialog: false,
        toggle_exclusive: undefined,
        route: this.$route.params.toSearch,
    }
  },

  methods: {
    changeToExercises() {
        this.exercises = true
        this.appointments = false
      },
    changeToAppointments() {
        this.exercises = false
        this.appointments = true
      },
  },

  async beforeMount() {
    const appointmentsToShow = [
      {
          title: "CITA FISIOTERAPIA - ALEJANDRO RUBIO",
          date: "24/10/2020",
          hour: "10:00",
          details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
          show: false,
      },
      {
          title: "Top western road trips",
          date: "1,000 miles of wonder",
          hour: "10:00",
          details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
          show: false,
      },
      {
        title: "CITA FISIOTERAPIA - SERGIO XXXXX",
        date: "24/10/2020",
        hour: "12:00",
        details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
        show: false,
      },
    ];
    const exercisesToShow = [ //beforemount cogere los datos del path desde el que me vengan y en el mounted los otros
      {
          title: "CITA FISIOTERAPIA - ALEJANDRO RUBIO",
          date: "24/10/2020",
          hour: "10:00",
          details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
          show: false,
      },
    ];

    this.Acards = appointmentsToShow,
    this.Ecards = exercisesToShow
    if (this.route.includes("appointments")){
      this.appointments = true
    } else if (this.route.includes("exercises")){
      this.exercises = true
    } 
  },
};
</script>