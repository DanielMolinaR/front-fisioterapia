<template>
  <v-card>
    <v-card-title v-text="title" style="font-family: Economica;"></v-card-title>

    <v-card-subtitle>
      <v-row align="center" justify="start">
        <v-icon color="#000000" class="pl-2 pb-1"
          >mdi-calendar-month-outline</v-icon
        >
        <span v-text="date" class="px-1"> </span>
        <v-icon color="#000000" class="pb-1">mdi-clock-outline</v-icon>
        <span v-text="hour" class="px-1"> </span>
      </v-row>
    </v-card-subtitle>

    <v-card-actions>
      <v-row>
        <v-col cols="12" md="12" lg="12" xl="12" sm="12">
          <v-btn color="red accent-2" :dark="true" @click="dialog = !dialog">
            Cancelar ejercicio
          </v-btn>
        </v-col>
      </v-row>
      <v-spacer />
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text v-text="details"> </v-card-text>
      </div>
    </v-expand-transition>
    <v-dialog v-model="dialog" max-width="500px">
      <template>
        <v-card flat>
          <v-container fluid>
            <v-row justify="space-around" align="center">
              <v-col cols="12" class="d-flex justify-center">
                <p class="mr-2">
                  ¿Estás seguro que quieres cancelar esta cita?
                </p>
              </v-col>
              <v-col cols="6" class="d-flex justify-center">
                <v-btn
                  class="mr-2"
                  outlined
                  color="red accent-2"
                  :dark="true"
                  @click="dialog = !dialog"
                >
                  NO
                </v-btn>
              </v-col>
              <v-col cols="6" class="d-flex justify-center">
                <v-btn
                  class="mr-2"
                  color="green accent-2"
                  :dark="true"
                  @click="deleteExercise"
                >
                  SÍ
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>

<script>
import auth from "../logic/Auth";

export default {
  props: {
    title: String,
    date: String,
    hour: String,
    dateForDB: String,
    details: String,
  },

  data: () => ({
    show: false,
    dialog: false,
  }),

  methods: {
    async deleteExercise() {
      try {
        let dateData = {
          DateTime: this.dateForDB,
        };
        let response = await auth.deleteExercise(dateData);
        console.log(response.data.state);
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
          .then(() => this.deleteExercise());
      } catch (error) {
        this.$store.dispatch("userLogout");
      }
    },
  },
};
</script>
