<template>
  <v-container >
    <v-expansion-panels focusable>
      <v-expansion-panel class="mb-2">
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
              <v-row no-gutters style="width: 100%;" class="mt-3 mb-2">
                <v-row align="center" justify="center">
                  <v-col cols="8">
                    <span v-text="email" />
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
          <v-expansion-panel-content>
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
              <v-col cols="12" md="4" lg="4" xl="4" sm="6" class="mt-5 mb-2">
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
          <v-expansion-panel-content class="mt-5 mb-2">
            <v-row align="center" justify="center">
              <v-col cols="12" md="4" lg="4" xl="4" sm="6" class="mb-2 mt-2">
                <v-row align="center" justify="center">
                  <v-btn color="#F5914D" :dark="true" @click="pushToCalendar">
                    Ver citas
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4" sm="6" class="mb-2 mt-2" v-if="!this.$props.admin">
                <v-row align="center" justify="center" >
                  <v-btn outlined color="#000000" :dark="true" @click="updateToAdmin">
                    Convertir a administrador
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4" sm="6" class="mb-2 mt-2">
                <v-row align="center" justify="center" v-if="this.$props.active">
                  <v-btn color="red accent-2" :dark="true" @click="layOffEmployee">
                    Suspender trabajador
                  </v-btn>
                </v-row>
                <v-row align="center" justify="center" v-if="!this.$props.active">
                  <v-btn color="success" :dark="true" @click="renewEmployee">
                    Renovar trabajador
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
          await this.changeTokens(true);
        } else {
          this.$router.push({
            name: "error",
            params: { error: error.response.data.state },
          });
        }
      }
    },

    async layOffEmployee(){
      let data = {
        DNI: this.$props.dni
      }
      try{
        let response = await auth.layOff(data)
        console.log(response)
        this.$router.go(0);
      } catch (error) {
        if (error.response.data.state === "Token no valido") {
          await this.changeTokens(false);
        } else {
          this.$router.push({
            name: "error",
            params: { error: error.response.data.state },
          });
        }
      }
    },

    async renewEmployee(){
      let data = {
        DNI: this.$props.dni
      }
      try{
        let response = await auth.renew(data)
        console.log(response)
        this.$router.go(0);
      } catch (error) {
        if (error.response.data.state === "Token no valido") {
          await this.changeTokens(false);
        } else {
          this.$router.push({
            name: "error",
            params: { error: error.response.data.state },
          });
        }
      }
    },

    async changeTokens(isUpgrade) {
      try {
        let response = await auth.getNewPairOfTokens(
          this.$store.getters.getRefreshToken
        );

        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;

        await this.$store
          .dispatch("tokensChange", { accessToken, refreshToken })
          .then(() => {if (isUpgrade){this.updateToAdmin()}else if (this.$props.active){this.layOffEmployee()}else{this.renew()}});
      } catch (error) {
        this.$store.dispatch("userLogout");
      }
    },

  },
};
</script>
