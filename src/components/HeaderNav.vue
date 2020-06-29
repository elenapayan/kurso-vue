<template>
  <nav class="nav-container">
    <div>
      <Button
        icon="pi pi-home"
        class="p-button-sm p-button-raised p-button-secondary"
        @click="navToHome()"
        style="margin:2px"
      />
      <Button
        label="BackOffice"
        class="p-button-sm p-button-raised p-button-secondary"
        @click="navToBackOffice()"
        style="margin:2px; font-size:12px"
      />
    </div>
    <div>
      <Button
        v-if="user.length > 0"
        icon="pi pi-sign-out"
        class="p-button-sm p-button-raised p-button-secondary"
        @click="logout()"
        style="margin:2px; background-color:rgba(180, 5, 5, 0.8); border-color:rgb(180, 5, 5);color:white"
      />
    </div>
  </nav>
</template>

<script>
import Button from "primevue/button";
import { mapGetters } from "vuex";

export default {
  name: "HeaderNav",
  components: {
    Button: Button
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/home");
    },
    navToHome() {
      this.$router.push({
        name: "Home"
      });
    },
    navToBackOffice() {
      this.$router.push({
        name: "BackOffice"
      });
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style scoped>
.nav-container {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 53px;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: space-between;
  padding: 5px 20px 0 20px;
}
</style>