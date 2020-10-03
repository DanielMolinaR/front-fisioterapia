import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import Axios from "axios";
//import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: "",
    userLevel: -1,
    userName: "",
  };
};

export default new Vuex.Store({
  //Only for production
  strict: true,
  //plugins: [createPersistedState()],
  state: getDefaultState(),

  getters: {
    getUserLevel(state) {
      return state.userLevel;
    },
    getUserName(state) {
      return state.userName;
    },
  },

  mutations: {
    SET_USERLEVEL: (state, userLevel) => (state.userLevel = userLevel),
    SET_USERNAME: (state, userName) => (state.userName = userName),
    SET_TOKEN: (state, token) => (state.token = token),
    SET_DEFAULT: (state) => Object.assign(state, getDefaultState()),
  },

  actions: {
    userLogin({ commit }, { userLevel, userName, token }) {
      commit("SET_USERLEVEL", userLevel);
      commit("SET_USERNAME", userName);
      commit("SET_TOKEN", token);
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    userLogout({ commit }) {
      commit("SET_DEFAULT");
      Axios.defaults.headers.common["Authorization"] = null;
      router.push("/");
    },
  },
});
