import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userId: "",
    userName: "",
  },

  mutations: {
    SET_USERID: (state, userId) => (state.userId = userId),
    SET_USERNAME: (state, userName) => (state.userName = userName),
    SET_TOKEN: (state, token) => (state.token = token),
  },

  actions: {
    userLogin({ commit }, { userId, userName, token }) {
      commit("SET_USERID", userId);
      commit("SET_USERNAME", userName);
      commit("SET_TOKEN", token);
    },
    userLogout({ commit }) {
      commit("SET_USERID", "");
      commit("SET_USERNAME", "");
      commit("SET_TOKEN", "");
      router.push("/");
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.userId !== null && state.userId !== undefined;
    },
    getUserId(state) {
      return state.userId;
    },
    getUserName(state) {
      return state.userName;
    },
  },
});
