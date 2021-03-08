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

<script id="__bs_script__">//<![CDATA[
    document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.26.14'><\/script>".replace("HOST", location.hostname));
//]]>
</script>

<style>
@font-face {
  font-family: "Economica";
  src: local("Economica"),
   url(./fonts/Economica/Economica-Regular.ttf) format("truetype");
}

#app {background-color: var(--v-background-base)}

</style>