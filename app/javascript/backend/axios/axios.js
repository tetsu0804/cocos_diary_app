import Vue from "vue"
import axios from "axios"

const API_URL = "http://localhost:5000"

const planAxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    header: {
      "Content-Type": "application/json"
    }
})

export { planAxiosInstance }
