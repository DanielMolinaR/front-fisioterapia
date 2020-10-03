<template>
  <v-content style="margin: 30px; font-family: Economica">
    <v-app-bar color="#fafafa" fixed>
      <v-btn icon v-on="on" @click="$router.push('/home')">
        <v-icon color="#000000">mdi-home-outline</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="black--text"
        style="font-size: 25px">FISIOTERAPIA <span style="color: #4793d7"> MOVIMIENTO </span><span style="color: #7ED957"> Y SALUD</span></v-toolbar-title
      >
      <v-spacer />
      <v-menu center offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="#000000">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list two-line subheader>
          <v-list-item>
            <v-list-item-title>Usuario: {{ username }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logOut">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-content>
</template>

<script>
export default {

  data() {
    return {
      username: this.$store.getters.getUserName,
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch("userLogout");
    },
  },

};
</script>
