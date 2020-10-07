<template>
    <v-container class="mt-n6">
        <p class="ml-n2" style="font-family: Economica; font-size: 40px" v-if="Object.values(route).includes('patients')">Pacientes:</p>
        <p class="ml-n2" style="font-family: Economica; font-size: 40px" v-if="Object.values(route).includes('employees')">Pacientes:</p>
        <v-expansion-panels focusable >
            <v-expansion-panel v-for="(item,i) in 5" :key="i">
            <v-expansion-panel-header>
                <v-row no-gutters align="center" justify="center">
                    <v-col cols="4">
                        Segismundo Matador
                    </v-col>
                    <v-col cols="8" class="text--secondary"  >
                        <v-row no-gutters  style="width: 100%" >
                            <v-row align="center" justify="center">
                                <v-col cols="6">
                                    Segismundo@gmail.com
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="6">
                                    Sexo: Hombre
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-col>
                </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-1" v-if="Object.values(route).includes('patients')">
                <v-row align="center" justify="center"> 
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="#4793d7" :dark= true>
                                Crear ejercicio
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="#7ED957" :dark= true>
                                Ver historial clínico
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn text color="#000000" :dark= true>
                                Ver perfil
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
            <v-expansion-panel-content class="pt-1" v-else-if="Object.values(route).includes('employees')">
                <v-row align="center" justify="center"> 
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="#4793d7" :dark= true>
                                Asignar Cita
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="#7ED957" :dark= true>
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
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>

export default {

  data () {
    const route = this.$route.params;

    return {
        route,
    }
  },
 
};
</script>