<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" absolute top right :color="this.color">
      <span>{{ answer }}</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.name"
              :rules="rules.notEmpty"
              color="#F5914D"
              label="Nombre del fisioterapeuta"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.physio_email"
              :rules="rules.email"
              color="#F5914D"
              label="Correo electrónico del fisioterapeuta"
              name="name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text @click="resetForm">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="#F5914D" type="submit">
          Enviar correo
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import auth from "../logic/Auth"

export default {
  name: "patientSignUpData",

  data() {
    const defaultForm = Object.freeze({
      name: "",
      physio_email: "",
    });

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        notEmpty: [(val) => (val || "").length > 0 || "Campo obligatorio"],
        email: [
          (value) => (value || "").length > 0 || "Campo obligatorio.",
          (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "correo electrónico erróneo.";
          },
        ],
      },
      snackbar: false,
      defaultForm,
      answer: "",
      color: "",
    };
  },

  computed: {
    formIsValid() {
      return this.checkEmail() && this.form.name;
    },
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    async submit() {
      let data = {
        Name: this.form.name,
        Email: this.form.physio_email
      }
      try{
        await auth.sendUniqueUrlForEmployeeSignUp(data)
      } catch (error) {
        if (error.response.data.state === "Token no valido") {
          await this.changeTokens();
        } else {
          this.color = "red accent-2";
          this.answer = error.response.data.state;
          this.snackbar = true;
        }
      }
    },

    async changeTokens() {
      try {
        let response = await auth.getNewPairOfTokens(
          this.$store.getters.getRefreshToken
        );

        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;

        await this.$store
          .dispatch("tokensChange", { accessToken, refreshToken })
          .then(() => this.submit());
      } catch (error) {
        this.$store.dispatch("userLogout");
      }
    },

    checkEmail() {
      let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(this.form.physio_email);
    },
  },
};
</script>
