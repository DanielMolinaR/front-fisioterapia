<template>
  <v-container class="mt-n6">
    <v-expansion-panels focusable>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-row no-gutters align="center" justify="center">
            <v-col
              cols="12"
              class="text--secondary"
              md="4"
              lg="4"
              xl="4"
              sm="6"
            >
              <v-row no-gutters style="width: 100%;">
                <v-row align="center" justify="center">
                  <v-col cols="8">
                    <span v-text="name + ' ' + surname" />
                  </v-col>
                </v-row>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              class="text--secondary"
              md="4"
              lg="4"
              xl="4"
              sm="6"
            >
              <v-row no-gutters style="width: 100%;">
                <v-row align="center" justify="center">
                  <v-col cols="8">
                    <span v-text="email" />
                  </v-col>
                </v-row>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              class="text--secondary my-n3"
              md="4"
              lg="4"
              xl="4"
              sm="6"
              v-if="this.$props.condition === 'employees'"
            >
              <v-row no-gutters style="width: 100%;">
                <v-row align="center" justify="center">
                  <v-col cols="8">
                    <span v-text="'Estado: '" />
                    <div
                      v-if="this.$props.admin"
                      class="rounded-circle pa-2 blue lighten-3 rounded-circle d-inline-block"
                    ></div>
                    <div
                      v-if="!this.$props.admin && this.$props.active"
                      class="rounded-circle pa-2 green accent-3 rounded-circle d-inline-block"
                    ></div>
                    <div
                      v-if="!this.$props.admin && !this.$props.active"
                      class="rounded-circle pa-2 red accent-3 rounded-circle d-inline-block"
                    ></div>
                  </v-col>
                </v-row>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <div v-if="this.$props.condition === 'patients'">
          <v-expansion-panel-content class="pt-1">
            <v-row align="center" justify="center">
              <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                <v-row align="center" justify="center">
                  <v-btn
                    color="#F5914D"
                    :dark="true"
                    @click="dialogE = !dialogE"
                  >
                    Crear ejercicio
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                <v-row align="center" justify="center">
                  <v-btn
                    color="#000000"
                    :dark="true"
                    outlined
                    @click="dialogA = !dialogA"
                  >
                    Crear cita
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                <v-row align="center" justify="center">
                  <v-btn
                    color="#0b0b0b"
                    :dark="true"
                    @click="pushToClinicalBackgorund"
                  >
                    Ver historial clínico
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </div>
        <div v-else-if="this.$props.condition === 'employees'">
          <v-expansion-panel-content class="pt-1">
            <v-row align="center" justify="center">
              <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                <v-row align="center" justify="center">
                  <v-btn color="#F5914D" :dark="true" @click="pushToCalendar">
                    Ver citas
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                <v-row align="center" justify="center" v-if="!this.$props.admin">
                  <v-btn outlined color="#000000" :dark="true" @click="updateToAdmin">
                    Convertir a administrador
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4" sm="6">
                <v-row align="center" justify="center">
                  <v-btn color="red accent-2" :dark="true">
                    Suspender trabajador
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </div>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="dialogA" max-width="500px">
      <CreateAppointment
        @changeDialog="dialogA = !dialogA"
        :email="this.$props.email"
      />
    </v-dialog>
    <v-dialog v-model="dialogE" max-width="1000px">
      <CreateExercise
        @changeDialog="dialogE = !dialogE"
        :email="this.$props.email"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import CreateAppointment from "../components/CreateAppointment";
import CreateExercise from "../components/CreateExercise";
import auth from "../logic/Auth"

export default {
  props: {
    condition: String,
    name: String,
    email: String,
    active: Boolean,
    admin: Boolean,
    dni: String,
    surname: String,
  },

  components: {
    CreateAppointment,
    CreateExercise,
  },

  data() {
    return {
      dialogA: false,
      dialogE: false,
    };
  },

  methods: {
    pushToCalendar() {
      this.$router.push("calendar");
    },
    pushToClinicalBackgorund() {
      this.$router.push({
        name: "clinical-background",
        params: { email: this.$props.email },
      });
    },

    async updateToAdmin(){
      let data = {
        DNI: this.$props.dni
      }
      try{
        let response = await auth.updateToAdmin(data)
        console.log(response)
        this.$router.go(0);
      } catch (error) {
        if (error.response.data.state === "Token no valido") {
          await this.changeTokens();
        } else {
          this.$router.push({
            name: "error",
            params: { error: error.response.data.state },
          });
        }
      }
    },

    async changeTokens() {
      try {
        let response = await auth.getNewPairOfTokens(
          this.$store.getters.getRefreshToken
        );

        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;

        await this.$store
          .dispatch("tokensChange", { accessToken, refreshToken })
          .then(() => this.updateToAdmin());
      } catch (error) {
        this.$store.dispatch("userLogout");
      }
    },

  },
};
</script>
