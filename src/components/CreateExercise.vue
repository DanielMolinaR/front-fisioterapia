<template>
  <v-card flat>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      :color="this.color"
    >
      <span>{{ answer }}</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
        <v-row>
            <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
            v-model="form.email"
              :rules="rules.email"
              color="#F5914D"
              label="Correo electrónico del paciente"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.name"
              :rules="rules.name"
              color="#F5914D"
              label="Nombre del ejercicio"
              name="name"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-textarea
              v-model="form.description"
              color="#F5914D"
              label="Descripción del ejercicio"
              outlined
              full-width
            >
                <template v-slot:label>
                    <div>
                    Descripción del ejercicio <small>(opcional)</small>
                    </div>
              </template>
            </v-textarea>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <DatePicker class="mt-n6"
                v-model="form.date"
                :rule="rules.date"
                @changeDate="setDate"
            />
          </v-col>
            <v-col
            cols="12"
            sm="6"
          >
            <TimePicker 
                v-model="form.hour"
                @changeHour="setHour"
            
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn
          text
          @click="resetForm"
        >
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!formIsValid"
          text
          color="#F5914D"
          type="submit"
        >
          Crear Ejercicio
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>

import DatePicker from "../components/DatePicker"
import TimePicker from "../components/TimePicker"

    export default {
        name: "patientSignUpData",

        components: {
            DatePicker,
            TimePicker
        },


    data () {
      const defaultForm = Object.freeze({
        name: '',
        patientEmail: '',
        date: null,
        hour: null,
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
            notEmpty: [val => (val || '').length > 0 || 'Campo obligatorio'],
            email: [
                value => (value || '').length > 0 || 'Campo obligatorio.',
                value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'correo electrónico erróneo.'
                },
            ],
            date: [
                value => {
                    let minimunDate = new Date()
                    var dateOfExercise = Date.parse(value)
                    return (dateOfExercise > minimunDate) || "Fecha no válida."
                }
            ],
        },
        snackbar: false,
        defaultForm,
        answer: "",
        color: "",
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.name &&
          this.checkEmail() &&
          this.checkDate() &&
          this.form.hour
        )
      },
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.color = "success"
        this.answer = "Ejercicio creado correctamente."
        this.snackbar = true
        this.resetForm()
      },
      checkDate() {
        let minimunDate = new Date()
        var dateOfExercise = Date.parse(this.form.date)
        return dateOfExercise > minimunDate
      },
      checkEmail() {
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(this.form.email)
      },
      setDate(value) {
          this.form.date = value
      },
      setHour(value) {
          this.form.hour = value
      },
    },
  }
</script>