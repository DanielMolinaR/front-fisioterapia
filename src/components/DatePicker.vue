<template>
    <v-container>
        <v-row align="left" justify="left">
            <v-col cols="12" lg="12" class="ml-n4">
                <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="computedDateFormatted"
                    label="Fecha"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="#F5914D"
                    :rules="rule"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu = false"
                    color="#F5914D"
                    @change="setDate"
                    :weekday-format="getDay"
                ></v-date-picker>
                </v-menu>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {

    props: {
      rule: Array
    },

    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false,
      daysOfWeek: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    }),

    computed: {
      computedDateFormatted : function() {
        return this.formatDate(this.date)
      },
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      setDate () {
          this.$emit("changeDate", this.computedDateFormatted)
      },
      getDay(date){
        let i = new Date(date).getDay(date)
        return this.daysOfWeek[i]
      },
    },
  }
</script>