<template>
  <div>
    <ul v-if="posts">
      <li v-for="post in posts" :key="post._id">
        <h3>{{post.title}}</h3>
        <p>{{post.content}}</p>
        <p>{{post.nickname}}</p>
        <a>
          <router-link :to="{name: 'PostDetails', params: {id: post._id}}">More details</router-link>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import proxy from "../services/ProxyService.js";

export default {
  name: "Post",
  mounted() {
    this.getAllPosts();
  },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    getAllPosts() {
      proxy.getAllPost().then(res => {
        if (res.status === 200) {
          this.posts = res.data;
        }
      });
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>