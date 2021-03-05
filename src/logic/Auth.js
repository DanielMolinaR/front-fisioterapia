import axios from "axios";

const ENDPOINT_PATH = "http://localhost:3000";

export default {

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
    axios.defaults.headers.common["Authorization"] = `Bearer ` + refreshToken;
    return axios.get(ENDPOINT_PATH + "/refresh-token").then(res => res)
  },

  createAppointment(appointmentData){
    return axios.post(ENDPOINT_PATH + "/create-appointments", appointmentData).then(res => res)
  },

  deleteAppointment(dateData){
    return axios.delete(ENDPOINT_PATH + "/delete-appointment", { data: dateData }).then(res => res)
  },

  createExercise(exerciseData){
    return axios.post(ENDPOINT_PATH + "/create-exercises", exerciseData).then(res => res)
  },

  deleteExercise(dateData){
    return axios.delete(ENDPOINT_PATH + "/delete-exercise", { data: dateData }).then(res => res)
  },

};