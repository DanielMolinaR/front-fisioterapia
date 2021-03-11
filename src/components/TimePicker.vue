<template>
  <v-row>
    <v-col cols="12">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Hora de inicio"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
            :rules="notEmpty"
            color="#F5914D"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu"
          v-model="time"
          format="24hr"
          full-width
          @click:minute="$refs.menu.save(time)"
          @change="setHour"
          color="#F5914D"
        ></v-time-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      time: null,
      menu: false,
      notEmpty: [(value) => !!value || "Campo obligatorio."],
    };
  },

  methods: {
    setHour() {
      this.$emit("changeHour", this.time);
    },
  },
};
</script>
