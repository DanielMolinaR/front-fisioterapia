<template> 
    <v-card>
    <v-card-text>
        <v-text-field :rules="emailRules" label="Correo electrónico del paciente" color="#4793d7" 
        class="pt-5"></v-text-field>
        <v-text-field :rules="phoneRules" label="Número de telefono del paciente" color="#4793d7" 
        class="pt-5" v-if="this.switch1 == true"></v-text-field>
        <v-text-field :rules="notEmpty" label="Nombre del paciente" color="#4793d7" 
        class="pt-5" v-if="this.switch1 == true"></v-text-field>
        <v-text-field :rules="emailRules" label="Correo electrónico del fisioterapeuta" 
        v-if="this.$store.getters.getUserLevel == 2" class="pt-5"></v-text-field>
        <DatePicker class="mt-n4"/>
        <TimePicker class="mt-n10 mb-n3 ml-n4"/>
        <v-switch v-model="switch1" :label="`Usuario Nuevo`"></v-switch>
        <small class="grey--text">**Todos los campos deben de ser rellenados**</small>
        <br/>
        <small class="grey--text">Nota: Si el paciente no tiene una cuenta de usuario en el sistema seleccione la opción de "Usuario Nuevo"</small>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#4793d7" @click="dialog = false" dark>
            Crear cita
        </v-btn>
    </v-card-actions>
    </v-card>
</template> 

<script>
import DatePicker from "../components/DatePicker"
import TimePicker from "../components/TimePicker"

    export default {
        name: "createAppointments",

        components: {
            DatePicker,
            TimePicker,
        },

        data: () =>({
            newUser: false,
            switch1: false,
            emailRules: [
                value => !!value || 'Campo obligatorio.',
                value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'correo electrónico erróneo.'
                },
            ],
            notEmpty: [
                value => !!value || 'Campo obligatorio.',
            ],
            phoneRules: [
                value => !!value || 'Campo obligatorio.',
                value => (value || '').length == 9 || 'Telefono no válido',
            ]
        }),

    }

</script>
