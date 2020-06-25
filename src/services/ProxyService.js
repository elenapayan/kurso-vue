import axios from "axios";
import '../interceptor.js';


const url = 'http://localhost:3000/api';

export default {

  getAllPost() {
    return axios.get(`${url}/posts`);
  },

  getPostById(id) {
    return axios.get(`${url}/posts/${id}`);
  },

  savePost(post) {
    return axios.post(`${url}/posts`, post);
  },

  updatePost(id, post) {
    return axios.put(`${url}/posts/${id}`, post);
  },

  deletePost(id) {
    return axios.delete(`${url}/posts/${id}`);
  },

  saveComment(id, comment) {
    return axios.post(`${url}/posts/${id}/comment`, comment);
  },

  updateComment(id, comment) {
    return axios.put(`${url}/comments/${id}`, comment);
  },

  deleteComment(id) {
    return axios.delete(`${url}/comments/${id}`);
  },

  saveUser(user) {
    return axios.post(`${url}/user`, user);
  },

};