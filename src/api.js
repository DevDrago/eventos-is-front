//import Vue from 'vue';
import axios from "axios";

const baseUrl = 'http://localhost:3000/api';

export default{
  get(url, request){
    axios.get(baseUrl+url)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  }
};