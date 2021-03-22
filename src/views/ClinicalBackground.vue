<template>
  <v-container>
    <TopBar />
    <v-card flat class="mt-14">
      <v-snackbar v-model="snackbar" absolute top right :color="this.color">
        <span>{{ answer }}</span>
        <v-icon dark>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-snackbar>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.dni"
                color="#F5914D"
                label="DNI del paciente "
                required
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-text-field
                v-model="form.reason"
                color="#F5914D"
                label="Razones de consulta"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <h2 class="d-flex justify-center">Anamnesis</h2>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.mq_antecedentes"
                color="#F5914D"
                label="Antecedentes médico-quirúrgicos"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.f_antecedentes"
                color="#F5914D"
                label="Antedecentes familiares"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.f_treatments"
                color="#F5914D"
                label="Tratamientos farmacológicos"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.m_treatments"
                color="#F5914D"
                label="Tratamientos médicos"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.exercise"
                color="#F5914D"
                label="Ejercicio"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.activities"
                color="#F5914D"
                label="Actividades"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.sleep"
                color="#F5914D"
                label="Sueño"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.nutrition"
                color="#F5914D"
                label="Nutrición"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <h2 class="d-flex justify-center">Exploración</h2>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.observation"
                color="#F5914D"
                label="Observación"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.pain_details"
                color="#F5914D"
                label="Detalles del dolor"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.range"
                color="#F5914D"
                label="Rango articular"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.daniels"
                color="#F5914D"
                label="Daniel's"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.deficits"
                color="#F5914D"
                label="Deficits"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12"> </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.yellow_flags"
                color="#F5914D"
                label="Banderas amarillas"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.diagnosis"
                color="#F5914D"
                label="Diagnóstico de fisioterapia"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.p_objectives"
                color="#F5914D"
                label="Objetivos del paciente"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.t_objectives"
                color="#F5914D"
                label="Objetivos del tratamiento "
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.treatment"
                color="#F5914D"
                label="Tratamiento del fisioterapeuta"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="form.progression"
                color="#F5914D"
                label="Progresión"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions class="mr-2">
            <v-spacer /><v-spacer></v-spacer>
            <v-btn
              dark
              color="#F5914D"
              type="submit"
              @click="updateClinicalBackground"
            >
              Actualizar cambios
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import auth from "../logic/Auth";

export default {
  name: "clinical-background",

  components: {
    TopBar,
  },

  data() {
    const defaultForm = Object.freeze({
      dni: "",
      reason: "",
      mq_antecedentes: "",
      f_antecedentes: "",
      f_treatments: "",
      m_treatments: "",
      exercise: "",
      activities: "",
      sleep: "",
      nutrition: "",
      observation: "",
      pain_details: "",
      range: "",
      daniels: "",
      deficits: "",
      yellow_flags: "",
      diagnosis: "",
      p_objectives: "",
      t_objectives: "",
      treatment: "",
      progression: "",
    });
    return {
      form: Object.assign({}, defaultForm),
      email: this.$route.params.email,
      snackbar: false,
      answer: "",
      color: "",
    };
  },

  async beforeMount() {
    if (this.$store.getters.getToken.length === 0) {
      this.$store.dispatch("userLogout");
    }
    if (this.email.length !== 0) {
      this.getData();
    }
  },

  methods: {
    async getData() {
      try {
        let data = {
          Email: this.email,
        };

        let response = await auth.getClinicalBackground(data);

        this.form.dni = response.data.Data.Patient_dni;
        this.form.reason = response.data.Data.Reason;
        this.form.mq_antecedentes =
          response.data.Data.Anamnesis.Mq_antecedentes;
        this.form.f_antecedentes = response.data.Data.Anamnesis.F_antecedentes;
        this.form.f_treatments = response.data.Data.Anamnesis.F_treatments;
        this.form.m_treatments = response.data.Data.Anamnesis.M_treatments;
        this.form.exercise = response.data.Data.Anamnesis.Habits.Exercise;
        this.form.activities = response.data.Data.Anamnesis.Habits.Activities;
        this.form.sleep = response.data.Data.Anamnesis.Habits.Sleep;
        this.form.nutrition = response.data.Data.Anamnesis.Habits.Nutrition;
        this.form.observation = response.data.Data.Exploration.Observation;
        this.form.pain_details = response.data.Data.Exploration.Pain_details;
        this.form.range = response.data.Data.Exploration.Range;
        this.form.daniels = response.data.Data.Exploration.Daniels;
        this.form.deficits = response.data.Data.Exploration.Deficits;
        this.form.yellow_flags = response.data.Data.Yellow_flags;
        this.form.diagnosis = response.data.Data.Diagnosis;
        this.form.p_objectives = response.data.Data.P_objectives;
        this.form.t_objectives = response.data.Data.T_objectives;
        this.form.treatment = response.data.Data.Treatment;
        this.form.progression = response.data.Data.Progression;
      } catch (error) {
        if (error.response.data.state === "Token no valido") {
          await this.changeTokens(true);
        } else {
          this.$router.push({
            name: "error",
            params: { error: error.response.data.state },
          });
        }
      }
    },

    async updateClinicalBackground() {
      let data = {
        Patient_dni: this.form.dni,
        Reason: this.form.reason,
        Anamnesis: {
          Mq_antecedentes: this.form.mq_antecedentes,
          F_antecedentes: this.form.f_antecedentes,
          F_treatments: this.form.f_treatments,
          M_treatments: this.form.m_treatments,
          Habits: {
            Exercise: this.form.exercise,
            Activities: this.form.activities,
            Sleep: this.form.sleep,
            Nutrition: this.form.nutrition,
          },
        },
        Exploration: {
          Observation: this.form.observation,
          Pain_details: this.form.pain_details,
          Range: this.form.range,
          Daniels: this.form.daniels,
          Deficits: this.form.deficits,
        },
        Yellow_flags: this.form.yellow_flags,
        Diagnosis: this.form.diagnosis,
        P_objectives: this.form.p_objectives,
        T_objectives: this.form.t_objectives,
        Treatment: this.form.treatment,
        Progression: this.form.progression,
      };
      try {
        let response = await auth.updateClinicalBackground(data);
        this.snackbar = true;
        this.answer = response.data.state;
        this.color = "success";
      } catch (error) {
        if (error.response.data.state === "Token no valido") {
          await this.changeTokens(false);
        } else {
          this.snackbar = true;
          this.answer = error.response.data.state;
          this.color = "red accent-2";
        }
      }
    },

    async changeTokens(isGetData) {
      try {
        let response = await auth.getNewPairOfTokens(
          this.$store.getters.getRefreshToken
        );

        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;

        await this.$store
          .dispatch("tokensChange", { accessToken, refreshToken })
          .then(() => {
            if (isGetData) {
              this.getData();
            } else {
              this.updateClinicalBackground();
            }
          });
      } catch (error) {
        this.$store.dispatch("userLogout");
      }
    },
  },
};
</script>
