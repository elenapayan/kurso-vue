import axios from "axios";

export default {
  login(user) {
    const auth = btoa(`${user.username}:${user.password}`);
    return axios.post('http://localhost:3000/api/login/', '', {
      headers: { Authorization: 'Basic ' + auth }
    });
  }
}