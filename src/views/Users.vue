<template>
  <v-container>
    <TopBar />
    <v-row class="mt-12">
      <v-col cols="6" sm="6" md="6" lg="6" xl="6">
        <p
          style="font-family: Economica; font-size: 40px;"
          v-if="this.state === 'patients'"
        >
          Pacientes:
        </p>
        <p
          style="font-family: Economica; font-size: 40px;"
          v-if="this.state === 'employees'"
        >
          Empleados:
        </p>
      </v-col>
      <v-col
        cols="6"
        sm="6"
        md="6"
        lg="6"
        xl="6"
        v-if="this.userLevel === 2 && this.state == 'employees'"
      >
        <v-card>
          <v-fab-transition>
            <v-btn
              color="#F5914D"
              dark
              absolute
              right
              fab
              @click="dialog = !dialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-n10 mb-n4" v-if="this.state === 'employees'">
      <v-col cols="12" class="d-flex justify-center">
        <p style="font-family: Economica; font-size: 18px;">
          Activo
          <span
            ><div
              class="rounded-circle pa-2 green accent-3 rounded-circle d-inline-block mr-2"
            ></div
          ></span>
          Inactivo
          <span
            ><div
              class="rounded-circle pa-2 red accent-3 rounded-circle d-inline-block mr-2"
            ></div
          ></span>
          Administrador
          <span
            ><div
              class="rounded-circle pa-2 blue lighten-3 rounded-circle d-inline-block mr-1"
            ></div
          ></span>
        </p>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <RegisterEmployee />
    </v-dialog>
    <v-row>
      <v-col v-for="user in this.users" :key="user.name" cols="12">
        <Users
          :condition="state"
          :name="user.name"
          :email="user.email"
          :active="user.active"
          :admin="user.admin"
          :dni="user.dni"
          :surname="user.surname"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import Users from "../components/UsersItems.vue";
import RegisterEmployee from "../components/RegisterNewEmployee";
import auth from "../logic/Auth";

export default {
  name: "users",

  components: {
    TopBar,
    Users,
    RegisterEmployee,
  },

  data() {
    return {
      route: this.$route.params.toSearch,
      state: "",
      userLevel: 0,
      users: [],
      dialog: false,
    };
  },

  beforeCreate() {
    if (this.$store.getters.getToken.length === 0) {
      this.$store.dispatch("userLogout");
    }
  },

  async created() {
    if (Object.keys(this.$route.params).length !== 0) {
      if (this.route.includes("patients")) {
        let param = "patients";
        await this.$store.dispatch("changeParam", { param });
      } else if (this.route.includes("employees")) {
        let param = "employees";
        await this.$store.dispatch("changeParam", { param });
      }
    }

    this.state = this.$store.getters.getParam;
    this.userLevel = this.$store.getters.getUserLevel;

    let route = "";
    if (this.state === "employees") {
      route = "get-all-employees";
    } else if (this.state === "patients") {
      route = "get-all-patients";
    }
    await this.getUsersData(route);
  },

  methods: {
    async getUsersData(route) {
      try {
        let response = await auth.getCards(route);
        await this.saveData(response);
      } catch (error) {
        if (error.response.data.state === "Token no valido") {
          await this.changeTokens(route);
        } else {
          this.$router.push({
            name: "error",
            params: { error: error.response.data.state },
          });
        }
      }
    },

    async saveData(response) {
      for (let user in response.data.dataToShow) {
        var dataToShow = {
          name: String,
          email: String,
          active: Boolean,
          admin: Boolean,
          dni: String,
          surname: String,
        };
        let data = response.data.dataToShow[user];
        dataToShow.name = data.Name;
        dataToShow.email = data.Email;
        dataToShow.active = data.Active;
        dataToShow.admin = data.Admin;
        dataToShow.dni = data.DNI;
        dataToShow.surname = data.Surname;
        this.users.push(dataToShow);
      }
    },

    async changeTokens(route) {
      try {
        let response = await auth.getNewPairOfTokens(
          this.$store.getters.getRefreshToken
        );

        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;

        await this.$store
          .dispatch("tokensChange", { accessToken, refreshToken })
          .then(() => this.getUsersData(route));
      } catch (error) {
        this.$store.dispatch("userLogout");
      }
    },
  },
};
</script>
