<template>
  <v-container fluid>
    <v-row align="center" justify="center">
        <v-col v-for="card in cards" :key="card.title" :cols="12" sm="6" md="4">
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
  data: () => ({
    cards: [
        {
            title: "CITA FISIOTERAPIA - ALEJANDRO RUBIO",
            date: "24/10/2020",
            hour: "10:00",
            details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false
        },
        {
            title: "Top western road trips",
            date: "1,000 miles of wonder",
            hour: "10:00",
            details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false
        },
        {
            title: "Top western road trips",
            date: "1,000 miles of wonder",
            hour: "10:00",
            details: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false
        },
    ],
  }),
};
</script>