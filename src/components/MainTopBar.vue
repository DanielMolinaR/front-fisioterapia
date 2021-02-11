<template>
  <v-container style="margin: 30px; font-family: Economica">
    <v-app-bar color="#fafafa" fixed>
      <v-btn icon v-on="on" @click="$router.push('/home')">
        <v-icon color="#000000">mdi-home-outline</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="black--text"
        style="font-size: 25px">
        <v-img 
          src= '../assets/images/logo-letras-en-linea.png'
            max-width= "400px"
            max-height="160px"
        ></v-img>
      </v-toolbar-title>
      <v-spacer />
      <v-menu center offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="#000000">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list two-line subheader>
          <v-list-item @click="profile">
            <v-list-item-title>Mi perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logOut">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {

  data() {
    return {
      on: '',
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch("userLogout");
    },
    profile() {

    }
  },

};
</script>
