<template>
  <v-container>
    <TopBar />
    <v-card flat class="mt-14 ">
        <v-form
        ref="form"
        @submit.prevent="submit"
        >
        <v-container fluid>
            <v-row>
                <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.dni"
                color="#F5914D"
                label="DNI del paciente "
                required
                outlined
                readonly
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="8"
                sm="12"
            >
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
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.mq_antecedentes"
                color="#F5914D"
                label="Antecedentes médicos"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.f_antecedentes"
                color="#F5914D"
                label="Antedecentes fisioterapéuticos"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.f_treatments"
                color="#F5914D"
                label="Tratamientos fisioterapéuticos"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.m_treatments"
                color="#F5914D"
                label="Tratamientos médicos"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.exercise"
                color="#F5914D"
                label="Ejercicio"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.activities"
                color="#F5914D"
                label="Actividades"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.sueño"
                color="#F5914D"
                label="Sueño"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <h2 class="d-flex justify-center">Exploración</h2>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.observation"
                color="#F5914D"
                label="Observación"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.pain_details"
                color="#F5914D"
                label="Detalles del dolor"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.range"
                color="#F5914D"
                label="Rango"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.daniels"
                color="#F5914D"
                label="Daniel's"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.deficits"
                color="#F5914D"
                label="Deficits"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.yellow_flags"
                color="#F5914D"
                label="Banderas amarillas"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.diagnosis"
                color="#F5914D"
                label="Diagnosis"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.p_objectives"
                color="#F5914D"
                label="Objetivos del paciente"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.t_objectives"
                color="#F5914D"
                label="Objetivos de la terapia"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.treatment"
                color="#F5914D"
                label="Tratamiento"
                required
                outlined
                ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
                <v-text-field
                v-model="form.progression"
                color="#F5914D"
                label="Progresión"
                required
                outlined
                ></v-text-field>
            </v-col>
            </v-row>
        </v-container>
        </v-form>
    </v-card>
    <div class="mt-16">{{ msg }}</div>
  </v-container>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import auth from "../logic/Auth"

export default {
  name: "clinical-background",

  components: {
    TopBar,
  },

  data () {
    const defaultForm = Object.freeze({
        dni: '',
        reason: '',
        mq_antecedentes: '',
        f_antecedentes: '',
        f_treatments: '',
        m_treatments: '',
        exercise: '',
        activities: '',
        sueño: '',
        observation: '',
        pain_details: '',
        range: '',
        daniels: '',
        deficits: '',
        yellow_flags: '',
        diagnosis: '',
        p_objectives: '',
        t_objectives: '',
        treatment: '',
        progression: '',
      })
    return{
      form: Object.assign({}, defaultForm),
      email: this.$route.params.email,
      msg: "",
    }
  },

 async beforeMount() {

    if (this.email.length !== 0){
      this.getData()
    }

  },

  methods: {
    async getData(){
        try{
            let data = {
                Email: this.email,
            }

            let response = await auth.getClinicalBackground(data)

            this.msg = response

        } catch (error) {
            console.log(error.response)
            if (error.response.data.state === "Token no valido"){
            await this.changeTokens()
            } else {
            this.$router.push({name: "error", params:{error: error.response.data.state}});
        }
      }
    },

    async changeTokens(){
      try{
        let response = await auth.getNewPairOfTokens(this.$store.getters.getRefreshToken)

        let accessToken = response.data.accessToken
        let refreshToken = response.data.refreshToken

        await this.$store
            .dispatch("tokensChange", { accessToken, refreshToken })
            .then(() => this.getData());
      } catch (error){
        this.$store.dispatch("userLogout");
      }
    },
  }

};
</script>