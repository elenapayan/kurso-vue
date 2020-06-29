<template>
  <div class="post-container">
    <DataTable :value="posts">
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
      <Column field="Options" header="Options">
        <!-- bodyStyle="text-align: center" -->
        <template #body="slotProps">
          <div class="buttons-container">
            <Button
              type="button"
              class="p-button-sm p-button-raised p-button-primary"
              icon="pi pi-eye"
              style="margin-right: .5em"
              @click="navToDetails(slotProps.data._id)"
            />
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
                @click="deletePost(slotProps.data._id)"
              />
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
    <Button
      type="button"
      label="Public post"
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
      <form>
        <div class="form-container-inputs">
          <span class="p-float-label" style="width: 40%; margin-bottom: 25px">
            <InputText
              id="nickname"
              type="text"
              class="p-inputtext-sm"
              style="width: 100%"
              v-model="post.nickname"
            />
            <label for="nickname">Nickname</label>
          </span>
          <span class="p-float-label" style="width: 57%; margin-bottom: 25px">
            <InputText
              id="title"
              type="text"
              class="p-inputtext-sm"
              style="width: 100%"
              v-model="post.title"
            />
            <label for="title">Title</label>
          </span>
        </div>
        <Textarea
          id="content"
          type="text"
          style="width: 100%; height: 100px; margin: 3px 0 15px 0; font-family: serif;
    font-size: 16px;"
          placeholder="Write your post..."
          v-model="post.content"
        />
        <Button
          v-if="this.id !== ''"
          type="submit"
          class="p-button-sm p-button-raised p-button-success"
          icon="pi pi-check"
          @click.prevent="updatePost(id, post)"
        />
        <Button
          v-else
          type="submit"
          class="p-button-sm p-button-raised p-button-success"
          icon="pi pi-check"
          @click.prevent="savePost(post)"
        />
      </form>
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

export default {
  name: "BOPost",
  components: {
    Button: Button,
    DataTable: DataTable,
    Column: Column,
    InputText: InputText,
    Textarea: Textarea
  },
  beforeMount() {
    this.$store.dispatch("getAllPosts").then(data => (this.posts = data));
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
      id: "",
      columns: null
    };
  },
  created() {
    this.columns = [
      { field: "title", header: "Title" },
      { field: "content", header: "Content" },
      { field: "nickname", header: "Nickname" }
    ];
  },
  methods: {
    savePost(post) {
      this.$store.dispatch("savePost", post);
      this.showForm("");
    },
    updatePost(id, post) {
      this.$store.dispatch("updatePost", { id, post });
      this.showForm("");
    },
    deletePost(id) {
      this.$store.dispatch("deletePost", id);
    },
    showForm(id) {
      this.show = !this.show;
      this.id = id;
      this.reset();
    },
    navToDetails(id) {
      this.$router.push({
        name: "BOPostDetails",
        params: {
          id: id
        }
      });
    },
    reset() {
      this.post = {
        title: "",
        nickname: "",
        content: ""
      };
    }
  },
  computed: {
    posts: {
      get() {
        return this.$store.state.posts;
      },
      set(value) {
        this.$store.commit("getPost", value);
      }
    },
    ...mapGetters(["user"])
  }
};
</script>

<style scoped>
.buttons-container {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.post-container {
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
.form-container-inputs {
  display: flex;
  justify-content: space-between;
}
</style>