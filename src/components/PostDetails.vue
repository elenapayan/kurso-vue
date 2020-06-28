<template>
  <div class="post-detail-container">
    <div class="post-detail-card">
      <post-card
        :title1.prop="postDetail.title"
        :text1.prop="postDetail.content"
        :text2.prop="postDetail.nickname"
      >
        <!-- <h4>{{postDetail.title}}</h4>
      <p>{{postDetail.content}}</p>
        <p>{{postDetail.nickname}}</p>-->
      </post-card>
    </div>
    <div v-if="postDetail.comments" class="post-detail-comments">
      <ul v-if="postDetail.comments.length > 0">
        <li v-for="comment in postDetail.comments" :key="comment._id">
          <post-comments :text1.prop="comment.comment" :text2.prop="comment.nickname">
            <!-- <p>{{comment.comment}}</p>
            <p>{{comment.nickname}}</p>-->
            <small slot="date">{{comment.date}}</small>
          </post-comments>
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
      postDetail: {}
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
<style scoped>
.post-detail-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  min-height: 82vh;
  padding: 70px 0 0 0;
}
.post-detail-card h4 {
  font-size: 20px;
  color: #161616;
}
.post-detail-card p {
  font-size: 14px;
  color: #535353;
}
.post-detail-comments {
  align-self: flex-end;
  margin-right: 17.5vw;
}
post-comments {
  display: flex;
  flex-direction: column;
}
post-comments small {
  align-self: flex-end;
}
</style>
