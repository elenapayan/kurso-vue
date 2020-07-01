<template>
  <div class="main-container">
    <div>
      <router-view></router-view>
    </div>
    <div slot="footer">
      <post-footer name="Elena Payán"></post-footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackOffice"
};
</script>

<style scoped>
.main-container {
  background: url("../../public/jess-bailey-lJU5KvoHQHk-unsplash.jpg") no-repeat
    bottom;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
}
</style>