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
      <v-btn icon v-on="on">
        <v-icon color="#000000" @click="logOut">mdi-logout</v-icon>
      </v-btn>
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
