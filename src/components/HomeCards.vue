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
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>
          <v-card-actions>
            <v-spacer />
            <v-btn :color="card.color" :dark=true
            @click='$router.push({name: card.path})'>
              Entrar
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
  props: {
    level: Number,
  },
  data() {
    return {
      cards: [
        {
          src:
            "https://images.unsplash.com/photo-1500061228850-950b0dc792c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          title: "Mis citas",
          color: "#7ED957",
          identification: this.identification,
          path: "draw",
        },
        {
          src:
            "https://images.unsplash.com/photo-1475506631979-72412c606f4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          title: "Mis ejercicios",
          color: "#4793D7",
          identification: "patient",
          path: "data",
        },
        {
          src:
            "https://images.unsplash.com/photo-1483861911361-57d334ad765b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3304&q=80",
          title: "Calendario",
          color: "#7ED957",
          identification: this.identification,
          path: "data",
        },
        {
          src:
            "https://images.unsplash.com/photo-1568495262088-4289581907ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          title: "Historial clínico",
          color: "#4793D7",
          identification: "patient",
          path: "data",
        },
        {
          src:
            "https://images.unsplash.com/photo-1524272332618-3a94122bb0c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          title: "Ver pacientes",
          color: "#7ED957",
          identification: "employee",
          path: "",
        },
        {
          src:
            "https://images.unsplash.com/photo-1473976345543-9ffc928e648d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3370&q=80",
          title: "Crear cita",
          color: "#7ED957",
          identification: "employee",
          path: "data",
        },
        {
          src:
            "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3289&q=80",
          title: "Crear ejercicio",
          color: "#7ED957",
          identification: "employee",
          path: "",
        },
        {
          src:
            "https://images.unsplash.com/photo-1510936470381-68e4c0a5e24b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80",
          title: "Crear trabajador",
          color: "#7ED957",
          identification: "admin",
          path: "",
        },
        {
          src:
            "https://images.unsplash.com/photo-1536353284924-9220c464e262?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80",
          title: "Suspender trabajador",
          color: "#7ED957",
          identification: "admin",
          path: "",
        },
        // ver trabajadores
      ],
    };
  },
  beforeMount() {
    const identification = this.$store.getters.getUserId;
    this.cards = this.cards.filter((el) => el.identification == identification);
  },
};
</script>
