<template>
  <v-container>
    <TopBar/>
    <v-row>
      <v-col cols="6" sm="6" md="6" lg="6" xl="6">
        <p style="font-family: Economica; font-size: 40px" v-if="this.state === 'patients'">Pacientes:</p>
        <p style="font-family: Economica; font-size: 40px" v-if="this.state === 'employees'">Empleados:</p>
      </v-col>
      <v-col cols="6" sm="6" md="6" lg="6" xl="6"
        v-if="this.userLevel > 1 && this.state == 'employees'">
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
    <v-row class="pt-4">
      <v-col v-for="user in this.users" :key="user.name" cols="12">
        <Users class="px-10 " :name="user.name" :email="user.email"/> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import Users from "../components/UsersItems.vue";
import RegisterEmployee from "../components/RegisterNewEmployee"
import auth from "../logic/Auth";


export default {
  name: "users",

  components: {
    TopBar,
    Users,
    RegisterEmployee,
  },

  data () {
    return{
      route: this.$route.params.toSearch,
      state: "",
      userLevel: 0,
      users: [],
      secondRoute: "",
      dialog: false,
    }
  },

  methods: {
    async getData(route){
      try {
        let response = await auth.getCards(route);

        for(let user in response.data.dataToShow) {
          var dataToShow = {name: String, email: String}
          let data = response.data.dataToShow[user]
          dataToShow.name = data.Name
          dataToShow.email = data.Email
          this.users.push(dataToShow)
        }
      } catch (error) {
        console.log(error.response)
        if (error.response.data.state === "Token no valido"){
          console.log("token no valido")
          try{
            let tokenResponse = await auth.getNewPairOfTokens()
            console.log(tokenResponse)
            let accessToken = tokenResponse.data.accessToken
            let refreshToken = tokenResponse.data.refreshToken
            await this.$store
                .dispatch("tokensChange", { accessToken, refreshToken })
                .then(() => this.$router.push({name: "users", params:{toSearch: this.state}}));
          } catch (error){
            this.$store.dispatch("userLogout");
          }
        } else {
          console.log(error.response)
        }
      }
    }
  },

  async beforeMount(){
    if (Object.keys(this.$route.params).length !== 0){
      if (this.route.includes("patients")){
        let param = "patients"
        await this.$store.dispatch("changeParam", {param})
      } else if (this.route.includes("employees")){
        let param = "employees"
        await this.$store.dispatch("changeParam", {param})
      } 
    }

    this.state = this.$store.getters.getParam
    this.userLevel = this.$store.getters.getUserLevel

    let route = ""
    if (this.state === "employees"){
      route = "get-all-employees"
    } else if (this.state === "patients"){
      route = "get-all-patients"
    }
    this.getData(route)
  }


};
</script>