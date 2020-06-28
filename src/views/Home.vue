<template>
  <div class="main-container">
    <layout-home>
      <div slot="section">
        <router-view></router-view>
      </div>
      <div slot="footer">
        <post-footer name="Elena Payán"></post-footer>
      </div>
    </layout-home>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
/* .main-container {
  background: url("../../public/scott-webb-GQD3Av_9A88-unsplash.jpg") no-repeat
    bottom;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
} */
</style>