import axios from "axios";

const ENDPOINT_PATH = "http://localhost:3000";

export default {

  signIn(userData, newUserId) {
    return axios.post(ENDPOINT_PATH + "/" + newUserId + "-signIn", userData);
  },

  loginBack(userData){
    return axios.post(ENDPOINT_PATH + "/", userData)
  },

  getData(info){
    return axios.get(ENDPOINT_PATH + "/" + info)
  },

  async login() {
    var data = JSON.stringify({
      'grant_type': 'password',
      'username': 'daniel.molina',
      'password': '1234567' 
     });
     var config = {
       method: 'post',
       url: 'http://localhost:8080/auth/realms/physiotherapy/protocol/openid-connect/token',
       headers: { 
         'Content-Type': 'application/json', 
         'Authorization': 'Basic ZnJvbnQtZW5kOjRmZDUzYzNlLWRhNTQtNGFkOC05MWRjLWIzZGE3YmVjNjUxZg=='
       },
       data : data
     };

     return axios(config).then((response) => {
      if (response.status === 409) return response.json();
      console.log(response);
      return response;
    }).catch(error => {
      if (error.response) {
        // Request made and server responded
        return error.response
      } else if (error.request) {
        // The request was made but no response was received
        return error.request
      } else {
        // Something happened in setting up the request that triggered an Error
        return error.messages
      }
    })
  },

  async createUser() {
    var data = JSON.stringify({"username":"daniel.molina","enabled":true,"credentials":[{"temporary":false,"type":"password","value":"1234567"}]});

    var config = {
      method: 'post',
      url: 'http://localhost:8080/auth/admin/realms/physiotherapy/users',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2VE9JVjhtY1p2dUpSeWdscDJibm4wa2ZVSG5MOWNFZ0RyN05nV3BkWWtvIn0.eyJleHAiOjE2MDEyMzEwMzUsImlhdCI6MTYwMTIyNzQzNSwianRpIjoiYzllNTVjMmYtOGFlYi00Mjc3LTlmZTYtMzIxZDJiMjI3NDZmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsInN1YiI6ImUwMjAxMWU4LTdkMmQtNGUyOC1iOGEyLWQwNDFhNDMxZDEyMSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLWNsaSIsInNlc3Npb25fc3RhdGUiOiIwY2YwYWE2Ny1lNmYxLTQyODktOTA5MC00ODJlMjcwZDU1MWIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIjEyNy4wLjAuMTo4MDgxIiwiaHR0cDovL3Rlc3Rkb21haW46ODA4MSIsImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MSIsImh0dHA6Ly8xOTIuMTY4LjEuMzY6ODA4MSJdLCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImRhbmltIn0.IgjckWKSNYkdg_aNEqXW902ECmw1HOnUiOsoRNgLcfL1xUc6ngCRW1-zx7ne0yKXWt42r-v0VMsSDOGIQfkPD9iONnZslm8aYEHALCya9ItOVqPkMPeIh3sdx-2xBi4oUsN-KAW1P0Hqy9fdxbLF5uFYj61niI4-Y8phPS2ZSgNwsFQa5WSFgceG2g7RAUribZTMSpSEGPE94yfmnwIGb3LpOOLsO6snxZXgwrFdiFHxuqct708YRonzBoOGbylo10P1YG9PTlbzCsv43IWpdGNNeLXUU62ywzKvdLcJ5qdax295X0H8ZGiln1GfM5ghPkDALdvQgmsMTRPcLIeVfg', 
        'Content-Type': 'application/json'
      },
      data : data,
    };
  
    return axios(config).then((response) => {
      return response;
    }).catch(error => {
      if (error.response) {
        // Request made and server responded
        return error.response
      } else if (error.request) {
        // The request was made but no response was received
        return error.request
      } else {
        // Something happened in setting up the request that triggered an Error
        return error.messages
      }
    })
  },

  
  async getAdminToken(){
    var data = JSON.stringify({
      "grant_type": "password",
      "username": "DaniM",
      'password': 'admin',
      'client_id': 'admin-cli'
     });
     var config = {
      method: 'post',
      url: 'http://localhost:8080/auth/realms/master/protocol/openid-connect/token',
      data : data,
     };

    axios.defaults.headers.common = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    }

     return axios(config).then((response) => {
      return response;
    }).catch(error => {
      if (error.response) {
        // Request made and server responded
        return error.response
      } else if (error.request) {
        // The request was made but no response was received
        return error.request
      } else {
        // Something happened in setting up the request that triggered an Error
        return error.messages
      }
    }) 
  }

};