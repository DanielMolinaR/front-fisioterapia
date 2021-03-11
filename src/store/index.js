import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import Axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: "",
    refreshToken: "",
    userLevel: -1,
    userName: "",
    param: "",
    email: "",
  };
};

export default new Vuex.Store({
  //Only for production
  strict: true,
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: getDefaultState(),

  getters: {
    getUserLevel(state) {
      return state.userLevel;
    },
    getUserName(state) {
      return state.userName;
    },
    getParam(state) {
      return state.param;
    },
    getEmail(state) {
      return state.email;
    },
    getToken(state) {
      return state.token;
    },
    getRefreshToken(state) {
      return state.refreshToken;
    },
  },

  mutations: {
    SET_USERLEVEL: (state, userLevel) => (state.userLevel = userLevel),
    SET_USERNAME: (state, userName) => (state.userName = userName),
    SET_TOKEN: (state, token) => (state.token = token),
    SET_REFRESHTOKEN: (state, refreshToken) =>
      (state.refreshToken = refreshToken),
    SET_DEFAULT: (state) => Object.assign(state, getDefaultState()),
    SET_PARAM: (state, param) => (state.param = param),
    SET_EMAIL: (state, email) => (state.email = email),
  },

  actions: {
    userLogin({ commit }, { userLevel, userName, token, refreshToken, email }) {
      commit("SET_USERLEVEL", userLevel);
      commit("SET_USERNAME", userName);
      commit("SET_REFRESHTOKEN", refreshToken);
      commit("SET_EMAIL", email);
      commit("SET_TOKEN", token);

      Axios.defaults.headers.common["Authorization"] = `Bearer ` + token;
    },
    userLogout({ commit }) {
      commit("SET_DEFAULT");
      Axios.defaults.headers.common["Authorization"] = null;
      sessionStorage.clear();
      router.push("/");
    },
    changeParam({ commit }, { param }) {
      commit("SET_PARAM", param);
    },
    tokensChange({ commit }, { accessToken, refreshToken }) {
      commit("SET_REFRESHTOKEN", refreshToken);
      commit("SET_TOKEN", accessToken);

      Axios.defaults.headers.common["Authorization"] = `Bearer ` + accessToken;
    },
  },
});
