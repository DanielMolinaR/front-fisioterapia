<template>
    <v-container class="mt-n6">
        <v-expansion-panels focusable >
            <v-expansion-panel>
            <v-expansion-panel-header>
                <v-row no-gutters align="center" justify="center">
                    <v-col cols="12" class="text--secondary"  md="4" lg="4" xl="4" sm="6">
                        <v-row no-gutters  style="width: 100%" >
                            <v-row align="center" justify="center">
                                <v-col cols="8">
                                    <span v-text="name" />
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-col>
                    <v-col cols="12" class="text--secondary"  md="4" lg="4" xl="4" sm="6" >
                        <v-row no-gutters  style="width: 100%" >
                            <v-row align="center" justify="center">
                                <v-col cols="8">
                                    <span v-text="email" />
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-col>
                </v-row>
            </v-expansion-panel-header>
            <div v-if="this.state === 'patients'">
                <v-expansion-panel-content class="pt-1" >
                <v-row align="center" justify="center"> 
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="#F5914D" :dark= true>
                                Crear ejercicio
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="#000000" :dark= true outlined> 
                                Crear cita
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="#0b0b0b" :dark= true>
                                Ver historial clínico
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-expansion-panel-content></div>
            <div v-else-if="this.state === 'employees'">
                <v-expansion-panel-content class="pt-1" >
                <v-row align="center" justify="center"> 
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="#F5914D" :dark= true @click="$router.push({name: calendar})">
                                Ver citas
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn outlined color="#000000" :dark= true>
                                Ver perfil
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="red accent-2" :dark= true>
                                Suspender trabajador
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
            </div>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>

export default {

    props: {
        name: String,
        email: String,
    },  

    data() {
        return {
            state: "",
        }
    },

    async beforeMount(){
        this.state = this.$store.getters.getParam
    }

};
</script>