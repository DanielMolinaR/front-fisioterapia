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
import Calendar from "../components/calendarComponent";
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
    if (this.$store.getters.getToken.length != 0){
      this.$store.dispatch("userLogout");
    }
  },

  async created() {
    await this.getCalendarData();
    console.log("HA TERMINADO EL CREATED");
    this.key = true;
    console.log(this.key);
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
        console.log(response);
        await this.saveAppointmentsData(response);

        if (this.userLevel === 0) {
          var exerciseResponse = await auth.getCards("get-exercises");
          console.log(exerciseResponse);
          await this.saveExerciseData(exerciseResponse);
        }

        console.log(this.eventsData);
      } catch (error) {
        console.log(error.response);
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
        console.log("Bucle citas");
        var dataToShow = {
          title: String,
          date: String,
          hour: String,
          details: String,
        };
        let info = response.data.dataToShow[data];

        if (this.userLevel === 0 || this.userLevel === 2) {
          dataToShow.title = "CITA FISIOTERAPIA - " + info.Employee_name;
        } else if (this.userLevel === 1) {
          dataToShow.title = "CITA FISIOTERAPIA - " + info.Patient_name;
        }

        const date = new Date(
          info.date.substring(0, 10) + " " + info.date.substring(11, 16)
        );
        const spRegionTime = new Date(date).toLocaleString("eu-SP", {
          timeZone: "GMT0",
        });
        console.log(spRegionTime);
        console.log("hola");
        dataToShow.date = spRegionTime.substring(0, spRegionTime.indexOf(" "));
        dataToShow.hour = spRegionTime.substring(
          spRegionTime.indexOf(" ") + 1,
          spRegionTime.length
        );

        console.log(this.eventsData);

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

        dataToShow.title = "EJERCICIO - " + info.Name;
        const date = new Date(
          info.date.substring(0, 10) + " " + info.date.substring(11, 16)
        );
        const spRegionTime = new Date(date).toLocaleString("eu-SP", {
          timeZone: "GMT0",
        });

        dataToShow.date = spRegionTime.substring(0, spRegionTime.indexOf(" "));
        dataToShow.hour = spRegionTime.substring(
          spRegionTime.indexOf(" ") + 1,
          spRegionTime.length
        );
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
