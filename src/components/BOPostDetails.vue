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
          <button type="button" @click="showForm(comment._id)">Edit</button>
          <button type="button" @click="deleteComment(comment._id)">Delete</button>
        </li>
      </ul>
      <p v-else>
        <em>There are no comments</em>
      </p>
      <button type="button" @click="showForm('')">Public comment</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <form v-if="show">
      <label for="comment">Comment</label>
      <input type="text" name="comment" v-model="comment.comment" />
      <label for="nickname">Nickname</label>
      <input type="text" name="nickname" v-model="comment.nickname" />
      <input
        v-if="this.id !== ''"
        @click.prevent="updateComment(comment)"
        type="submit"
        value="Update post"
      />
      <input v-else @click.prevent="saveComment(comment)" type="submit" value="New post" />
    </form>
  </div>
</template>

<script>
import proxy from "../services/ProxyService.js";

export default {
  name: "BOPostDetails",
  mounted() {
    const id = this.$route.params.id;
    this.getPostById(id);
  },
  data() {
    return {
      postDetail: [],
      comment: {
        comment: "",
        nickname: ""
      },
      show: false,
      id: "",
      postId: ""
    };
  },
  filters: {},
  methods: {
    getPostById(id) {
      this.postId = id;
      proxy.getPostById(this.postId).then(res => {
        if (res.data) {
          this.postDetail = res.data;
        }
      });
    },
    saveComment(comment) {
      proxy.saveComment(this.postId, comment);
    },
    updateComment(comment) {
      proxy.updateComment(this.id, comment);
    },
    deleteComment(id) {
      proxy.deleteComment(id);
    },
    showForm(id) {
      this.show = !this.show;
      this.id = id;
    }
  }
};
</script>
