import jwt_decode from 'jwt-decode';
import Vue from 'vue';
import Vuex from 'vuex';
import proxy from '../services/ProxyService';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    posts: [],
    post: {},
    user: {}
  },
  getters: {
    posts: state => { return state.posts },
    postDetail: state => { return state.post },
    user: state => { return state.user }
  },
  actions: {
    getAllPosts({ commit }) {
      proxy.getAllPost()
        .then(res => {
          commit('getPosts', res.data)
        })
        .catch(error => console.log(error))
    },
    savePost({ commit }, post) {
      proxy.savePost(post)
        .then(res => {
          commit('savePost', res.data)
        })
        .catch(error => console.log(error))
    },
    updatePost({ commit }, post) {
      proxy.updatePost(post.id, post.post)
        .then(res => {
          commit('updatePost', res.data)
        })
        .catch(error => console.log(error))
    },
    deletePost({ commit }, id) {
      proxy.deletePost(id)
        .then(res => {
          commit('deletePost', res.data._id)
        })
        .catch(error => console.log(error))
    },
    getPostById({ commit }, id) {
      proxy.getPostById(id)
        .then(res => {
          commit('getPost', res.data)
        })
        .catch(error => console.log(error))
    },
    saveComment({ commit }, comment) {
      proxy.saveComment(comment.id, comment.comment)
        .then(res => {
          commit('saveComment', res.data)
        })
        .catch(error => console.log(error))
    },
    updateComment({ commit }, comment) {
      proxy.updateComment(comment.id, comment.comment)
        .then(res => {
          commit('updateComment', res.data)
        })
        .catch(error => console.log(error))
    },
    deleteComment({ commit }, id) {
      proxy.deleteComment(id)
        .then(res => {
          commit('deleteComment', res.data._id)
        })
        .catch(error => console.log(error))
    },
    getUser({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('getUser', token);
      }
    },
  },
  mutations: {
    getPosts(state, posts) {
      state.posts = posts;
    },
    savePost(state, post) {
      state.posts = [...state.posts, post];
    },
    updatePost(state, post) {
      const p = Object.assign({}, post);
      const posts = state.posts;
      const index = posts.findIndex(item => item._id === post._id)
      state.posts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
    },
    deletePost(state, id) {
      state.posts = state.posts.filter(post => post._id !== id);
    },
    getPost(state, post) {
      state.post = post;
    },
    saveComment(state, comment) {
      const newComment = [...state.post.comments, comment];
      state.post = { ...state.post, comments: newComment };
    },
    updateComment(state, comment) {
      const c = Object.assign({}, comment);
      const comments = state.post.comments;
      const index = comments.findIndex(item => item._id === comment._id);
      const newComment = [...state.post.comments.slice(0, index), c, ...state.post.comments.slice(index + 1)];
      state.post = { ...state.post, comments: newComment };
    },
    deleteComment(state, id) {
      const comments = state.post.comments.filter(comment => comment._id !== id);
      state.post = { ...state.post, comments: comments };
    },
    getUser(state, token) {
      const decode = jwt_decode(token);
      const u = Object.assign({}, decode.body);
      state.user = u;
    },
  }
})

