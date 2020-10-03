<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col v-for="card in cards" :key="card.title" :cols="12" sm="6" md="4">
        <v-card>
          <v-img
            class="white--text align-end"
            height="200px"
            :src="card.src"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title v-text="card.title" style="font-family: Economica"></v-card-title>
          </v-img>
          <v-card-actions>
            <v-spacer />
            <v-btn :color="card.color" :dark=true
            @click='$router.push({name: card.path})'>
            <span style="font-size: 90%">
              Entrar
              </span>
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          src:
            require('../assets/images/mis_citas5.jpg'),
          title: "MIS CITAS",
          color: "#7ED957",
          level: 0, // patient level
          path: "draw",
        },
        {
          src:
            require('../assets/images/mis_ejercicios.jpg'),
          title: "MIS EJERCICIOS",
          color: "#4793D7",
          level: 0,
          path: "data",
        },
        {
          src:
          require('../assets/images/calendario3.jpg'),
          title: "CALENDARIO",
          color: "#7ED957",
          level: 0,
          path: "data",
        },
        {
          src:
            require('../assets/images/historial_clinico2.jpg'),
          title: "HISTORIAL CLÍNICO",
          color: "#4793D7",
          level: 1,
          path: "data",
        },
        {
          src:
            require('../assets/images/ver_pacientes1.jpg'),
          title: "VER PACIENTES",
          color: "#7ED957",
          level: 1, //employee level
          path: "",
        },
        {
          src:
            require('../assets/images/ver_trabajadores.jpg'),
          title: "VER TRABAJADORES", //crear trabajador
          color: "#4793D7",
          level: 2,
          path: "",
        },
      ],
    };
  },
  beforeMount() {
    const level = this.$store.getters.getUserLevel;
    this.cards = this.cards.filter((el) => el.level <= level);
  },
};
</script>
