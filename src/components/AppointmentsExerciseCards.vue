<template>
  <v-container fluid>
    <v-row class="pb-6 mt-n4 pl-6">
        <v-btn-toggle v-model="toggle_exclusive" rounded >
        <v-btn value="appointments" @click="changeToAppointments">Mis citas</v-btn>
        <v-btn value="exercises" @click="changeToExercises">Mis ejercicios</v-btn>
        </v-btn-toggle>
    </v-row>
    <v-row align="center" justify="center">
        <v-col v-for="card in this.cards" :key="card.title" :cols="12" sm="6" md="4">
            <v-card>

                <v-card-title v-text="card.title" style="font-family: Economica"></v-card-title>
                
                <v-card-subtitle>
                    <v-row align="center" justify="start">
                        <v-icon color="#000000" class="pl-2 pb-1">mdi-calendar-month-outline</v-icon>
                        <span v-text="card.date" class="px-1">
                        </span>
                        <v-icon color="#000000" class="pb-1">mdi-clock-outline</v-icon>
                        <span v-text="card.hour" class="px-1">
                        </span>
                    </v-row>
                </v-card-subtitle>

                <v-card-actions>
                <v-btn
                    color="red accent-2"
                    :dark= true
                >
                    Cancelar cita
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    icon
                    @click="card.show = !card.show"
                >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                </v-card-actions>

                <v-expand-transition>
                <div v-show="card.show">
                    <v-divider></v-divider>

                    <v-card-text v-text="card.details"></v-card-text>
                </div>
                </v-expand-transition>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    const route = this.$route.params;

    return {
        toggle_exclusive: undefined,
        route,
    }
  },
  methods: {
    changeToExercises() {
        this.route = "exercise"
        //mostrar exercise
      },
    changeToAppointments() {
        this.route = "appointments"
        //mostrar appointments
      },
  },
  beforeMount() {
    const route = Object.values(this.route);
    let dataToShow;
    if (route.includes("appointments")){
        dataToShow = [
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
                title: "Top western road trips",
                date: "1,000 miles of wonder",
                hour: "10:00",
                details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
                show: false,
            },
        ];
    } else {
        dataToShow = [
            {
                title: "CITA FISIOTERAPIA - ALEJANDRO RUBIO",
                date: "24/10/2020",
                hour: "10:00",
                details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
                show: false,
            },
        ];
    }
    this.cards = dataToShow
    //if route exercise => auth.getExercise -- Mis ejercicios (button) true
    //if route appointments => auth.getAppointments -- Mis citas (button) true
  },

  mounted() {
      this.$refs.route.checkChange()
      //if exercise were taken => auth.getAppointments
      //if appointments were taken => auth.getExercise
  }   
};
</script>