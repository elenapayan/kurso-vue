<template>
  <div>
    <ul v-if="posts" class="post-list">
      <li v-for="post in posts" :key="post._id">
        <post-card :title1.prop="post.title" :text1.prop="post.content" :text2.prop="post.nickname">
          <button-more slot="btn" text="More Details" @clickPost="onTap(navToDetails(post._id))">
            <!-- <router-link :to="{name: 'PostDetails', params: {id: post._id}}">More Details</router-link> -->
          </button-more>
        </post-card>
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
    },
    navToDetails(id) {
      this.$router.push({
        name: "PostDetails",
        params: {
          id: id
        }
      });
    }
  }
};
</script>
<style scoped>
.post-list {
  padding: 70px 0 0 0;
  min-height: 95vh;
}
post-card {
  display: flex;
  flex-direction: column;
}
button-more {
  align-self: flex-end;
}
</style>
