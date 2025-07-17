import axios from "axios";

const adminAPI = axios.create({
  baseURL: 'http://localhost:3000/admin',
  withCredentials: true,
});

export default adminAPI;