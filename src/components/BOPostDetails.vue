<template>
  <div class="postDetail-container">
    <div v-if="postDetail">
      <Card style="width: 60vw; margin-bottom: 20px">
        <template slot="title">{{postDetail.title}}</template>
        <template slot="content">{{postDetail.content}}</template>
        <template slot="subtitle">
          <em>{{postDetail.nickname}}</em>
        </template>
      </Card>
      <div v-if="postDetail.comments.length > 0">
        <DataTable :value="postDetail.comments" v-if="postDetail.comments.length > 0">
          <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
          <Column field="Options" header="Options">
            <template #body="slotProps">
              <div v-if="user[0].role==='admin' || user[0]._id===slotProps.data.authorId">
                <Button
                  type="button"
                  class="p-button-sm p-button-raised p-button-warning"
                  icon="pi pi-pencil"
                  style="margin-right: .5em"
                  @click="showForm(slotProps.data._id)"
                />
                <Button
                  type="button"
                  class="p-button-sm p-button-raised p-button-danger"
                  icon="pi pi-trash"
                  @click="deleteComment(slotProps.data._id)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else>
        <p>
          <em>There are no comments</em>
        </p>
      </div>
      <!-- </div> -->
      <!-- <div v-else>
      <p>Loading...</p>
      </div>-->
      <Button
        type="button"
        label="Public comment"
        class="p-button-sm p-button-raised p-button-secondary"
        style="margin:10px"
        @click="showForm('')"
      />
      <div v-if="show" class="form-container">
        <i
          class="pi pi-times-circle"
          style="margin-bottom: 15px; cursor: pointer"
          @click="showForm('')"
        ></i>
        <form v-if="show">
          <span class="p-float-label" style="width: 40%; margin-bottom: 25px">
            <InputText
              id="nickname"
              type="text"
              class="p-inputtext-sm"
              style="width: 100%"
              v-model="comment.nickname"
            />
            <label for="nickname">Nickname</label>
          </span>
          <Textarea
            id="comment"
            type="text"
            style="width: 100%; height: 100px; margin: 3px 0 15px 0; font-family: serif;
    font-size: 16px;"
            placeholder="Write your comment..."
            v-model="comment.comment"
          />
          <Button
            v-if="this.id !== ''"
            type="submit"
            class="p-button-sm p-button-raised p-button-success"
            icon="pi pi-check"
            @click.prevent="updateComment(comment)"
          />
          <Button
            v-else
            type="submit"
            class="p-button-sm p-button-raised p-button-success"
            icon="pi pi-check"
            @click.prevent="saveComment(comment)"
          />
        </form>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Card from "primevue/card";

export default {
  name: "BOPostDetails",
  components: {
    Button: Button,
    DataTable: DataTable,
    Column: Column,
    InputText: InputText,
    Textarea: Textarea,
    Card: Card
  },
  beforeMount() {
    const id = this.$route.params.id;
    this.postId = id;
    this.$store.dispatch("getPostById", id);
    this.$store.dispatch("getUser");
  },
  data() {
    return {
      comment: {
        comment: "",
        nickname: ""
      },
      show: false,
      id: "",
      postId: "",
      columns: null
    };
  },
  created() {
    this.columns = [
      { field: "comment", header: "Comment" },
      { field: "nickname", header: "Nickname" },
      { field: "date", header: "Date" }
    ];
  },
  methods: {
    saveComment(comment) {
      const id = this.postId;
      this.$store.dispatch("saveComment", { id, comment });
      this.showForm("");
    },
    updateComment(comment) {
      const id = this.id;
      this.$store.dispatch("updateComment", { id, comment });
      this.showForm("");
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id);
    },
    showForm(id) {
      this.show = !this.show;
      this.id = id;
      this.reset();
    },
    reset() {
      this.comment = {
        comment: "",
        nickname: ""
      };
    }
  },
  computed: {
    ...mapGetters(["postDetail"]),
    ...mapGetters(["user"])
  }
};
</script>

<style scoped>
.postDetail-container {
  padding: 70px 0 0 0;
  margin: 0 10vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 95vh;
}
.form-container {
  margin: 20px 0 60px 0;
  border: solid rgba(192, 192, 192, 0.5) 2px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 5px;
  padding: 10px;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.form-container .pi {
  align-self: flex-end;
}
</style>
