<template>
  <v-content class="mt-n16">
    <v-container class="fill-height mt-n16" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="#7ED957" dark flat>
              <v-toolbar-title>Inicio de sesión</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  label="Correo electrónico / DNI"
                  color="#7ED957"
                  name="username"
                  v-model="username"
                  type="username"
                  v-on:keyup.enter="login"
                  flat
                />

                <v-text-field
                  id="password"
                  label="Contraseña"
                  name="password"
                  v-model="password"
                  color="#7ED957"
                  type="password"
                  v-on:keyup.enter="login"
                  flat
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="#7ED957"
                dark
                rounded
                @click="login"
                value="login"
              >
                <span v-if="!loading">Iniciar sesión</span>
              </v-btn>
            </v-card-actions>
          </v-card>
          <div class="mt-4">
            <p v-if="error" class="error" align="center">
              {{ msg }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import auth from "../logic/Auth";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      loading: false,
      username: "",
      password: "",
      error: false,
      msg: "",
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        /*const userData = {
          DNI: this.username,
          password: this.password,
        };*/
        const response = await auth.getAdminToken();
        console.log(response)
        this.msg = response.data.state;
        this.error = true;
        /*if (this.msg == "Sesión inicada") {
          const token = "response.data.token";
          const userName = response.data.userName;
          const userLevel = response.data.userLevel;
          await this.$store
            .dispatch("userLogin", { userLevel, userName, token })
            .then(() => this.$router.push("home"));
        } else if (this.msg == "Sesión iniciada por token") {
          this.$router.push("home");
        } else {
          this.error = true;
          this.loading = false;
        }*/
      } catch (error) {
        this.loading = false;
        this.error = true;
      }
    },
  },
};
</script>


