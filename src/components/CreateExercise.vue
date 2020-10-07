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
          <v-col cols="12" md="6" lg="6" xl="6" sm="8">
            <v-textarea label="Descripción del ejercicio" color="#4793d7" outlined full-width>
              <template v-slot:label>
                <div>
                  Descripción del ejercicio <small>(opcional)</small>
                </div>
              </template>
            </v-textarea>
          </v-col>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#4793d7" @click="dialog = false" dark>
            Crear ejercicio
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
