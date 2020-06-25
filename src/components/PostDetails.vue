<template>
  <div>
    <div>
      <h4>{{postDetail.title}}</h4>
      <p>{{postDetail.content}}</p>
      <p>{{postDetail.nickname}}</p>
    </div>
    <div v-if="postDetail.comments">
      <ul v-if="postDetail.comments.length > 0">
        Comments:
        <li v-for="comment in postDetail.comments" :key="comment._id">
          <p>{{comment.comment}}</p>
          <p>{{comment.nickname}}</p>
          <small>{{comment.date}}</small>
        </li>
      </ul>
      <p v-else>
        <em>There are no comments</em>
      </p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import proxy from "../services/ProxyService.js";

export default {
  name: "PostDetails",
  mounted() {
    const id = this.$route.params.id;
    this.getPostById(id);
  },
  data() {
    return {
      postDetail: []
    };
  },
  filters: {},
  methods: {
    getPostById(id) {
      proxy.getPostById(id).then(res => {
        if (res.data) {
          this.postDetail = res.data;
        }
      });
    }
  }
};
</script>
