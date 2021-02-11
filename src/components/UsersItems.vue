<template>
    <v-container class="mt-n6">
        <v-row>
            <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                <p style="font-family: Economica; font-size: 40px" v-if="state === 'patients'">Pacientes:</p>
                <p style="font-family: Economica; font-size: 40px" v-if="state === 'employees'">Empleados:</p>
            </v-col>
            <v-col cols="6" sm="6" md="6" lg="6" xl="6"
                v-if="user_level > 0 && state == 'employees'">
                <v-card>
                    <v-fab-transition>
                    <v-btn color="#F5914D" dark absolute
                     right fab @click="dialog = !dialog"
                    >
                    <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-fab-transition>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="500px">
            <RegisterEmployee/>
        </v-dialog>
        <v-expansion-panels focusable >
            <v-expansion-panel v-for="(item,i) in 5" :key="i">
            <v-expansion-panel-header>
                <v-row no-gutters align="center" justify="center">
                    <v-col cols="12" class="text--secondary"  md="4" lg="4" xl="4" sm="6">
                        <v-row no-gutters  style="width: 100%" >
                            <v-row align="center" justify="center">
                                <v-col cols="8">
                                    Segismundo Matador
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-col>
                    <v-col cols="12" class="text--secondary"  md="4" lg="4" xl="4" sm="6" >
                        <v-row no-gutters  style="width: 100%" >
                            <v-row align="center" justify="center">
                                <v-col cols="8">
                                    Segismundo@gmail.com
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-col>
                </v-row>
            </v-expansion-panel-header>
            <div v-if="state === 'patients'">
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
                                Ver perfil
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
            <div v-else-if="state === 'employees'">
                <v-expansion-panel-content class="pt-1" >
                <v-row align="center" justify="center"> 
                    <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                        <v-row align="center" justify="center">
                            <v-btn color="#F5914D" :dark= true>
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
import RegisterEmployee from "../components/RegisterNewEmployee"

export default {

    components: {
        RegisterEmployee
    },

  props: {
      state: String,
      user_level: Number,
  },  

    data() {
        return {
            dialog: false,
        }
    },

};
</script>