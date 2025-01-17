import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/sign-up",
    name: "signUp",
    component: () => import("../views/SignUpPatient.vue"),
  },
  {
    path: "/appointments-exercise",
    name: "appointments-exercise",
    props: true,
    component: () => import("../views/Appointments-Exercise.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    props: true,
    component: () => import("../views/Calendar.vue"),
  },
  {
    path: "/users",
    name: "users",
    props: true,
    component: () => import("../views/Users.vue"),
  },
  {
    path: "/error",
    name: "error",
    props: true,
    component: () => import("../views/Error.vue"),
  },
  {
    path: "/email-verification/:slug",
    name: "email-verification",
    props: true,
    component: () => import("../views/EmailVerification.vue"),
  },
  {
    path: "/esign-up/:slug",
    name: "eSignUp",
    props: true,
    component: () => import("../views/SignUpEmployee.vue"),
  },
  {
    path: "/clinical-background",
    name: "clinical-background",
    props: true,
    component: () => import("../views/ClinicalBackground.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
