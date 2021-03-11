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
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.email"
              :rules="rules.email"
              color="#F5914D"
              label="Correo electrónico del paciente"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.name"
              :rules="rules.name"
              color="#F5914D"
              label="Nombre del ejercicio"
              name="name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-textarea
              v-model="form.description"
              color="#F5914D"
              label="Descripción del ejercicio"
              outlined
              full-width
            >
              <template v-slot:label>
                <div>Descripción del ejercicio <small>(opcional)</small></div>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <DatePicker
              class="mt-n6"
              v-model="form.date"
              :rule="rules.date"
              @changeDate="setDate"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <TimePicker v-model="form.hour" @changeHour="setHour" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text @click="resetForm">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="#F5914D" type="submit">
          Crear Ejercicio
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import auth from "../logic/Auth";

export default {
  name: "createExercise",

  props: {
    email: String,
  },

  components: {
    DatePicker,
    TimePicker,
  },

  mounted() {
    console.log(this.$props.email);
    this.form.email = this.$props.email;
  },

  data() {
    const defaultForm = Object.freeze({
      name: "",
      email: "",
      description: "",
      date: null,
      hour: null,
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
        date: [
          (value) => {
            let minimunDate = new Date();
            minimunDate.setDate(minimunDate.getDate() - 1);
            var dateOfExercise = Date.parse(value);
            return dateOfExercise > minimunDate || "Fecha no válida.";
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
      return (
        this.form.name &&
        this.checkEmail() &&
        this.checkDate() &&
        this.form.hour
      );
    },
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
      this.$emit("changeDialog");
    },
    async submit() {
      try {
        let exerciseData = {
          Exercise_name: this.form.name,
          Patient_email: this.form.email,
          Description: this.form.description,
          Hour: parseInt(this.form.hour.substring(0, 2)),
          Minute: parseInt(this.form.hour.substring(3, 5)),
          Day: parseInt(this.form.date.substring(3, 5)),
          Month: parseInt(this.form.date.substring(0, 2)),
          Year: parseInt(this.form.date.substring(6, 10)),
        };
        console.log(exerciseData);
        let response = await auth.createExercise(exerciseData);
        console.log(response);

        this.color = "success";
        this.answer = response.data.state;
        this.snackbar = true;
        this.resetForm();
      } catch (error) {
        console.log(error.response);
        if (error.response.data.state === "Token no valido") {
          await this.changeTokens();
        } else {
          this.color = "red accent-2";
          this.answer = error.response.data.state;
          this.snackbar = true;
          this.resetForm();
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
    checkDate() {
      let minimunDate = new Date();
      minimunDate.setDate(minimunDate.getDate() - 1);
      var dateOfExercise = Date.parse(this.form.date);
      return dateOfExercise > minimunDate;
    },
    checkEmail() {
      let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(this.form.email);
    },
    setDate(value) {
      this.form.date = value;
    },
    setHour(value) {
      this.form.hour = value;
    },
  },
};
</script>
