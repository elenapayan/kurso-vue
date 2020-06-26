<template>
  <nav>
    <div>
      <router-link to="/home">Home</router-link>
      <router-link :to="{name:'BackOffice'}">BackOffice</router-link>
      <button @click.prevent="logout()">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderNav",
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
a {
  margin: 10px;
}
</style>