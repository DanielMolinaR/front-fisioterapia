import axios from "axios";

const ENDPOINT_PATH = "http://localhost:3000";

export default {

  signIn(userData, newUserId) {
    return axios.post(ENDPOINT_PATH + "/" + newUserId + "-signIn", userData);
  },

  loginBack(userData){
    return axios.post(ENDPOINT_PATH + "/login", userData).then(res => res)
  },

  getData(info){
    return axios.get(ENDPOINT_PATH + "/" + info)
  },

  getCards(route){
    return axios.get(ENDPOINT_PATH + "/" + route).then(res => res)
  },

  getUsers(route){
    return axios.get(ENDPOINT_PATH + "/" + route).then(res => res)
  },

  getNewPairOfTokens(refreshToken){
    console.log("entra")
    axios.defaults.headers.common["Authorization"] = `Bearer ` + refreshToken;
    console.log("llega")
    return axios.get(ENDPOINT_PATH + "/refresh-token").then(res => res)
  }

};