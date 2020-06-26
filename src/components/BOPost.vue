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
        <div v-if="user.role==='admin' || user._id===post.authorId">
        <button type="button" @click="showForm(post._id)">Edit</button>
        <button type="button" @click="deletePost(post._id)">Delete</button>
        </div>
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
import { mapGetters } from "vuex";

export default {
  name: "BOPost",
  beforeMount() {
    this.$store.dispatch("getAllPosts");
    this.$store.dispatch("getUser");
  },
  data() {
    return {
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
    savePost(post) {
      this.$store.dispatch("savePost", post);
    },
    updatePost(id, post) {
      this.$store.dispatch("updatePost", { id, post });
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    showForm(id) {
      this.show = !this.show;
      this.id = id;
    }
  },
  computed: {
    ...mapGetters(["posts"]),
    ...mapGetters(["user"])
  }
};
</script>

<style scoped>
</style>