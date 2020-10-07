<template>
    <v-card >
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
            <v-row>
                <v-col cols="12" md="12" lg="12" xl="6" sm="12" >
                    <v-btn color="#4793d7" :dark= true>
                        Posponer ejercicio
                    </v-btn>
                </v-col>
                
                <v-col cols="12" md="12" lg="12" xl="6" sm="12">
                    <v-btn color="red accent-2" :dark= true>
                        Cancelar ejercicio
                    </v-btn>
                </v-col>
            </v-row>
        <v-spacer/>

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

        data:() => ({
            show: false,
        })


    }


</script>