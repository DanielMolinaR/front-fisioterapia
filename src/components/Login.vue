<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#7ED957" dark flat>
                <v-toolbar-title>Inicio de sesión</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" @keyup.native.enter="submit">
                  <v-text-field
                    label="Correo electrónico / DNI"
                    color="#7ED957"
                    name="login"
                    v-model="username"
                    type="username"
                    flat
                  />

                  <v-text-field
                    id="password"
                    label="Contraseña"
                    name="password"
                    v-model="password"
                    color="#7ED957"
                    type="password"
                    flat
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#7ED957" dark rounded @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      valid: false,
      username: '',
      password: '',
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('userLogin', {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
