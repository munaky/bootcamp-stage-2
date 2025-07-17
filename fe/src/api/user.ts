import axios from "axios";

const userAPI = axios.create({
  baseURL: 'http://localhost:3000/user',
  withCredentials: true,
});

export default userAPI;