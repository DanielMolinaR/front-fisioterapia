<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="mt-16">
      <v-col
        cols="12"
        sm="10"
        md="5"
        lg="5"
        xl="4"
        align-self="center"
        class="mt-16"
      >
        <v-card class="mt-16" :color="this.color">
          <br />
          <v-card-text
            class="headline"
            v-text="this.msg"
            style="color: white; font-weight: bold;"
          ></v-card-text>
          <br />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from "../logic/Auth"

export default {
  data() {
    return {
      slug: this.$route.path.substring(20, this.$route.path.length),
      color: "", //success y red accent-2
      msg: "",
    };
  },

  beforeMount() {
    this.sendVerification()
  },

  mounted() {
    console.log(this.$route.query.page)
  },

  methods: {
    async sendVerification() {
      try {
        console.log(this.slug)
        let response = await auth.verifyEmail(this.slug)
        console.log(response)
        this.color = "success"
        this.msg = response.data.state
      } catch (error){
        console.log(error.response)
        this.color = "red accent-2";
        this.msg = error.response.data.state;
      }
    },
  },
};
</script>
