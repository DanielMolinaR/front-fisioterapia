<template>
  <div>
    <TopBar />
    <Calendar
      class="px-10 mt-8"
      :user_level="userLevel"
      :eventsDataToIterate="eventsData"
      :keyComponent="key"
    />
  </div>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import Calendar from "../components/CalendarComponent";
import auth from "../logic/Auth";

export default {
  name: "calendar",

  components: {
    TopBar,
    Calendar,
  },

  data() {
    return {
      eventsData: [],
      userLevel: this.$store.getters.getUserLevel,
      key: false,
    };
  },

  beforeMount() {
    if (this.$store.getters.getToken.length === 0) {
      this.$store.dispatch("userLogout");
    }
  },

  async created() {
    await this.getCalendarData();
    this.key = true;
  },

  methods: {
    async getCalendarData() {
      try {
        let response;
        if (this.userLevel === 2) {
          response = await auth.getCards("get-all-appointments");
        } else if (this.userLevel >= 0 && this.userLevel < 2) {
          response = await auth.getCards("get-appointments");
        }
        await this.saveAppointmentsData(response);

        if (this.userLevel === 0) {
          var exerciseResponse = await auth.getCards("get-exercises");
          await this.saveExerciseData(exerciseResponse);
        }
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

    async saveAppointmentsData(response) {
      for (let data in response.data.dataToShow) {
        var dataToShow = {
          title: String,
          date: String,
          hour: String,
          details: String,
        };
        let info = response.data.dataToShow[data];

        if (this.userLevel === 0 || this.userLevel === 2) {
          dataToShow.title = info.Employee_name + " - CITA FISIOTERAPIA";
        } else if (this.userLevel === 1) {
          dataToShow.title = info.Patient_name + " - CITA FISIOTERAPIA";
        }

        dataToShow.date = info.date.substring(0, 10)
        dataToShow.hour = info.date.substring(11, 16)

        if (this.userLevel === 0) {
          dataToShow.details =
            "Cita en la clinica FORTIA calle San Juan.<br><b> Fisioterapeuta: </b>" +
            info.Employee_name;
        } else if (this.userLevel === 1) {
          dataToShow.details =
            "Cita en la clinica FORTIA calle San Juan. <br><b> Paciente: </b>: " +
            info.Patient_name;
        } else if (this.userLevel === 2) {
          dataToShow.details =
            "Cita en la clinica FORTIA calle San Juan.<br><b> Paciente: </b>" +
            info.Patient_name +
            "<br><b> Fisioterapeuta: </b>" +
            info.Employee_name;
        }

        this.eventsData.push(dataToShow);
      }
    },

    async saveExerciseData(response) {
      for (let data in response.data.dataToShow) {
        var dataToShow = {
          title: String,
          date: String,
          hour: String,
          details: String,
        };
        let info = response.data.dataToShow[data];

        dataToShow.title = info.Name + " - EJERCICIO";

        dataToShow.date = info.date.substring(0, 10)
        dataToShow.hour = info.date.substring(11, 16)
        dataToShow.details = info.Description;

        this.eventsData.push(dataToShow);
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
          .then(() => this.getCalendarData());
      } catch (error) {
        this.$store.dispatch("userLogout");
      }
    },
  },
};
</script>
