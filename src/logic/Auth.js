import axios from "axios";

const ENDPOINT_PATH = "http://localhost:3000";

export default {
  signIn(userData, newUserId) {
    return axios.post(ENDPOINT_PATH + "/" + newUserId + "-signIn", userData);
  },
  login(userData) {
    return axios.post(ENDPOINT_PATH + "/", userData);
  }
};