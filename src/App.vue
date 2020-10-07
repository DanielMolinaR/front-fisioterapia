<template>
  <v-app id="app">
    <v-main transition="slide-x-transition">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@font-face {
  font-family: "Economica";
  src: local("Economica"),
   url(./fonts/Economica/Economica-Regular.ttf) format("truetype");
}

#app {background-color: var(--v-background-base)}

</style>