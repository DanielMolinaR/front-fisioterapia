<template>
  <div>
    <TopBar/>
    <Calendar class="px-10"/>
  </div>
</template>

<script>
import TopBar from "../components/MainTopBar.vue";
import Calendar from "../components/calendarComponent"

export default {
  name: "calendar",

  components: {
    TopBar,
    Calendar,
  },
};
</script>