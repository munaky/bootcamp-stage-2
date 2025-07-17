import axios from "axios";

const authAPI = axios.create({
  baseURL: 'http://localhost:3000/auth',
  withCredentials: true,
});

export default authAPI;