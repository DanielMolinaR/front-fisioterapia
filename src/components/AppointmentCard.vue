<template>
    <v-card>
        <v-card-title v-text="title" style="font-family: Economica"></v-card-title>
        
        <v-card-subtitle>
            <v-row align="center" justify="start">
                <v-icon color="#000000" class="pl-2 pb-1">mdi-calendar-month-outline</v-icon>
                <span v-text="date" class="px-1">
                </span>
                <v-icon color="#000000" class="pb-1">mdi-clock-outline</v-icon>
                <span v-text="hour" class="px-1">
                </span>
            </v-row>
        </v-card-subtitle>

        <v-card-actions>

        <v-btn color="red accent-2" :dark= true>
            Cancelar cita
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show" >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
        </v-card-actions>

        <v-expand-transition>
        <div v-show="show">
            <v-divider></v-divider>

            <v-card-text v-text="details">           
            </v-card-text>
        </div>
        </v-expand-transition>
    </v-card>
</template>

<script>

    export default {
    
        props: {
            title: String,
            date: String,
            hour: String,
            details: String,
        },

        data: () => ({
            show: false,
        })

    }


</script>