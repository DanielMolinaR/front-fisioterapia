<template>
  <v-app id="app">
    <v-main transition="slide-x-transition">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { BeforeInstallPromptEvent } from "vue-pwa-install";
export default {
  name: "App",

  data() {
    return {
      deferredPrompt: BeforeInstallPromptEvent,
      refreshing: false,
    };
  },
  created() {
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
};
</script>

<style>
@font-face {
  font-family: "Economica";
  src: local("Economica"),
    url(./fonts/Economica/Economica-Regular.ttf) format("truetype");
}
#app {
  background-color: var(--v-background-base);
}
</style>
