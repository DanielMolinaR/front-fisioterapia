<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Fecha de nacimiento"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        color="#F5914D"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="setDate"
      color="#F5914D"
      :month-format="getMonth"
      :weekday-format="getDay"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    date: null,
    menu: false,
    months: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Agos",
      "Sept",
      "Oct",
      "Nov",
      "Dic",
    ],
    daysOfWeek: ["D", "L", "M", "X", "J", "V", "S"],
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    setDate(date) {
      this.$emit("changeDate", this.formatDate(date));
    },
    getMonth(date) {
      let i = new Date(date).getMonth(date);
      return this.months[i];
    },
    getDay(date) {
      let i = new Date(date).getDay(date);
      return this.daysOfWeek[i];
    },
  },
};
</script>
