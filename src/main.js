import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import "../registerServiceWorker";
import axios from "axios";
import VuePwaInstallPlugin from "vue-pwa-install";

Vue.use(VuePwaInstallPlugin);

Vue.config.productionTip = false;
Vue.use(axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");