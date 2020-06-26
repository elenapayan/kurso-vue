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
        value="Update comment"
      />
      <input v-else @click.prevent="saveComment(comment)" type="submit" value="New comment" />
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BOPostDetails",
  beforeMount() {
    const id = this.$route.params.id;
    this.postId = id;
    this.$store.dispatch("getPostById", id);
  },
  data() {
    return {
      comment: {
        comment: "",
        nickname: ""
      },
      show: false,
      id: "",
      postId: ""
    };
  },
  methods: {
    saveComment(comment) {
      const id = this.postId;
      this.$store.dispatch("saveComment", { id, comment });
    },
    updateComment(comment) {
      const id = this.id;
      this.$store.dispatch("updateComment", { id, comment });
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id);
    },
    showForm(id) {
      this.show = !this.show;
      this.id = id;
    }
  },
  computed: {
    ...mapGetters(["postDetail"])
  }
};
</script>
