<template>
  <section class="app-main scroll-bar">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  position: relative;
  height: calc(100vh - 50px);
  overflow: auto;
  /* min-height: calc(100vh - 50px); */
  /* overflow: hidden; */
}
</style>
