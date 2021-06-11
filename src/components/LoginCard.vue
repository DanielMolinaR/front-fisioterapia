<template>
  <v-container class="mt-n16">
    <v-container class="fill-height mt-n16" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="#2B2A29" dark flat>
              <v-toolbar-title>Inicio de sesión</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  label="DNI / NIF"
                  color="#2B2A29"
                  name="username"
                  v-model="username"
                  type="username"
                  v-on:keyup.enter="login"
                  flat
                />

                <v-text-field
                  id="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Contraseña"
                  name="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  color="#2B2A29"
                  @click:append="showPassword = !showPassword"
                  v-on:keyup.enter="login"
                  flat
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <a @click="pushToSignUp" class="text-decoration-none ml-2"
                >Crea una cuenta</a
              >
              <v-spacer />
              <v-btn color="#2B2A29" dark rounded @click="login" value="login">
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
  </v-container>
</template>

<script>
import auth from "../logic/Auth";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      showPassword: false,
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
        let userData = {
          DNI: this.username,
          password: this.password,
        };
        let response = await auth.loginBack(userData);
        if (response.data.state == "Sesión iniciada") {
          let token = response.data.accessToken;
          let refreshToken = response.data.refreshToken;
          let userName = response.data.userName;
          let userLevel = response.data.role;
          let email = response.data.email;
          await this.$store
            .dispatch("userLogin", {
              userLevel,
              userName,
              token,
              refreshToken,
              email,
            })
            .then(() => this.$router.push("home"));
        } else if (response.data.state == "Sesión iniciada gracias al token") {
          this.$router.push("home");
        }
      } catch (error) {
        this.msg = error.response.data.state;
        this.loading = false;
        this.error = true;
      }
    },

    pushToSignUp() {
      this.$router.push("sign-up");
    },
  },
};
</script>
