<template>
  <div>
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