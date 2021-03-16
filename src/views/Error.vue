<template>
  <v-container>
    <TopBar />
    <v-container>
      <v-col cols="12" align-self="end">
        <v-row
          align="center"
          justify="center"
          align-content="center"
          style="margin-top: 10%;"
        >
          <v-card color="red accent-2" :dark="true" width="500px">
            <h1 class="ml-6 mt-4" style="margin-left: 16px;">ERROR</h1>
            <br />
            <v-container
            class="pr-10"
              style="margin-left: 16px; margin-right: 16px;"
              v-text="this.msg"
            >
            </v-container>
            <br />
          </v-card>
        </v-row>
      </v-col>
    </v-container>
  </v-container>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";

export default {
  name: "home",

  components: {
    TopBar,
  },

  data() {
    return {
      route: "",
      msg: "Ha habido algún problema al recuperar los datos del historial clínico"
    };
  },

  async beforeMount() {
    this.route = this.$route.params.error;
  },
};
</script>
