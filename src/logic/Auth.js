import axios from "axios";

const ENDPOINT_PATH = "http://localhost:3000";

export default {
  loginBack(userData) {
    return axios.post(ENDPOINT_PATH + "/login", userData).then((res) => res);
  },

  getData(info) {
    return axios.get(ENDPOINT_PATH + "/" + info);
  },

  getCards(route) {
    return axios.get(ENDPOINT_PATH + "/" + route).then((res) => res);
  },

  getUsers(route) {
    return axios.get(ENDPOINT_PATH + "/" + route).then((res) => res);
  },

  getNewPairOfTokens(refreshToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ` + refreshToken;
    return axios.get(ENDPOINT_PATH + "/refresh-token").then((res) => res);
  },

  createAppointment(appointmentData) {
    return axios
      .post(ENDPOINT_PATH + "/create-appointments", appointmentData)
      .then((res) => res);
  },

  deleteAppointment(dateData) {
    return axios
      .delete(ENDPOINT_PATH + "/delete-appointment", { data: dateData })
      .then((res) => res);
  },

  createExercise(exerciseData) {
    return axios
      .post(ENDPOINT_PATH + "/create-exercises", exerciseData)
      .then((res) => res);
  },

  deleteExercise(dateData) {
    return axios
      .delete(ENDPOINT_PATH + "/delete-exercise", { data: dateData })
      .then((res) => res);
  },

  getClinicalBackground(data) {
    return axios
      .post(ENDPOINT_PATH + "/get-clinical-background", data)
      .then((res) => res);
  },

  verifyEmail(slug){
    axios.defaults.headers.common["Authorization"] = `Bearer ` + slug;
    return axios
      .patch(ENDPOINT_PATH + "/verify-email")
      .then((res) => res);
  },

  signUpPatient(data){
    return axios.post(ENDPOINT_PATH + "/patient-signUp", data).then((res) => res);
  },

  updateToAdmin(data){
    return axios
    .patch(ENDPOINT_PATH + "/update-employee-to-admin", data)
    .then((res) => res);
  },

  updateClinicalBackground(data){
    return axios
    .patch(ENDPOINT_PATH + "/update-clinical-background", data)
    .then((res) => res);
  },

  sendUniqueUrlForEmployeeSignUp(data){
    return axios
      .post(ENDPOINT_PATH + "/generate-and-send-unique-URL", data)
      .then((res) => res);
  },

  signUpEmployee(slug, data){
    axios.defaults.headers.common["Authorization"] = `Bearer ` + slug;
    return axios
      .post(ENDPOINT_PATH, "/employee-signUp", data)
      .then((res) => res);
  },

};
