import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        background: "#fffafa",
      },
    },
    options: {
      customProperties: true,
    },
  },
};

export default new Vuetify(opts);
