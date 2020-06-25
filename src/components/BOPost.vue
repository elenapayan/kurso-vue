<template>
  <div>
    <ul v-if="posts">
      <li v-for="post in posts" :key="post._id">
        <h3>{{post.title}}</h3>
        <p>{{post.content}}</p>
        <p>{{post.nickname}}</p>
        <a>
          <router-link :to="{name: 'BOPostDetails', params: {id: post._id}}">More details</router-link>
        </a>
        <button type="button" @click="showForm(post._id)">Edit</button>
        <button type="button" @click="deletePost(post._id)">Delete</button>
      </li>
    </ul>
    <button type="button" @click="showForm('')">Public post</button>
    <form v-if="show">
      <label for="title">Title</label>
      <input type="text" name="title" v-model="post.title" />
      <label for="nickname">Nickname</label>
      <input type="text" name="nickname" v-model="post.nickname" />
      <label for="content">Content</label>
      <input type="text" name="content" v-model="post.content" />
      <input
        v-if="this.id !== ''"
        @click.prevent="updatePost(id, post)"
        type="submit"
        value="Update post"
      />
      <input v-else @click.prevent="savePost(post)" type="submit" value="New post" />
    </form>
    <div>
      <p>{{post.title}}</p>
      <p>{{post.nickname}}</p>
      <p>{{post.content}}</p>
    </div>
  </div>
</template>

<script>
import proxy from "../services/ProxyService.js";

export default {
  name: "BOPost",
  mounted() {
    this.getAllPosts();
  },
  data() {
    return {
      posts: [],
      post: {
        title: "",
        nickname: "",
        content: ""
      },
      show: false,
      id: ""
    };
  },
  methods: {
    getAllPosts() {
      proxy.getAllPost().then(res => {
        if (res.status === 200) {
          this.posts = res.data;
        }
      });
    },
    savePost(post) {
      proxy.savePost(post);
    },
    updatePost(id, post) {
      proxy.updatePost(id, post);
    },
    deletePost(id) {
      proxy.deletePost(id);
    },
    showForm(id) {
      this.show = !this.show;
      this.id = id;
    }
  }
};
</script>

<style scoped>
</style>