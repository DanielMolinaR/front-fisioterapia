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
            sm="12"
          >
            <v-text-field
            v-model="form.patient_email"
              :rules="rules.email"
              color="#F5914D"
              label="Correo electrónico del paciente"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
            v-model="form.name"
              :rules="rules.notEmpty"
              color="#F5914D"
              label="Nombre del paciente"
              required
              v-if="this.newUser==true"
            ></v-text-field>
          </v-col>
        <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
            v-model="form.phone"
              :rules="rules.phone"
              color="#F5914D"
              label="Número de teléfono del paciente"
              required
              v-if="this.newUser==true"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="form.physio_email"
              :rules="rules.email"
              color="#F5914D"
              label="Correo electrónico del fisioterapeuta"
              name="name"
              required
              v-if="this.userLevel === 2"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <DatePicker 
                v-model="form.date"
                :rule="rules.date"
                @changeDate="setDate"
            />
          </v-col>
            <v-col
            cols="12"
            sm="12"
          >
            <TimePicker 
                v-model="form.hour"
                @changeHour="setHour"
            
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-switch v-model="newUser" :label="`Usuario Nuevo`" color="#F5914D"></v-switch>
            <small class="grey--text">**Todos los campos deben de ser rellenados**</small>
            <br/>
            <small class="grey--text">Nota: Si el paciente no tiene una cuenta de usuario en el sistema seleccione la opción de "Usuario Nuevo"</small>
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
          Crear Cita
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
        phone: '',
        patient_email: '',
        physio_email: '',
        date: null,
        hour: null,
      })

      return {
        userLevel: -1,
        form: Object.assign({}, defaultForm),
        newUser: false,
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
                    var dateOfAppointment = Date.parse(value)
                    return (dateOfAppointment > minimunDate) || "Fecha no válida."
                }
            ],
            phone: [
                value => (value || '').length > 0 || 'Campo obligatorio.',
                value => (value || '').length == 9 || 'Telefono no válido',
                value => {
                    const pattern = /^[679]{1}[0-9]{8}$/
                    return pattern.test(value) || 'Teléfono móvil erróneo.'
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
          if (this.userLevel===2){
              if (this.newUser){
                return (
                  this.form.name &&
                  this.checkPhone() &&
                  this.checkPatientEmail() &&
                  this.checkEmployeeEmail() &&
                  this.form.hour &&
                  this.checkDate() &&
                  this.form.patient_email != this.form.physio_email
                )
              } else {
                return (
                  this.checkPatientEmail() &&
                  this.checkEmployeeEmail() &&
                  this.form.hour &&
                  this.checkDate() &&
                  this.form.patient_email != this.form.physio_email
                )
              }
          } else {
              if (this.newUser){
                return (
                  this.form.name &&
                  this.checkPhone() &&
                  this.checkPatientEmail() &&
                  this.form.hour &&
                  this.checkDate() &&
                  this.form.patient_email != this.form.physio_email
                )
              } else {
                return (
                  this.checkPatientEmail() &&
                  this.form.hour &&
                  this.checkDate() &&
                  this.form.patient_email != this.form.physio_email
                )
              }
          }
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
        var dateOfAppointment = Date.parse(this.form.date)
        return dateOfAppointment > minimunDate
      },
      checkPhone() {
        let pattern = /^[679]{1}[0-9]{8}$/
        return pattern.test(this.form.phone)
      },
      checkPatientEmail() {
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(this.form.patient_email)
      },
      checkEmployeeEmail() {
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(this.form.physio_email)
      },
      setDate(value) {
          this.form.date = value
      },
      setHour(value) {
          this.form.hour = value
      },
    },

    async beforeMount() {
        this.userLevel = this.$store.getters.getUserLevel
    }
  }
</script>