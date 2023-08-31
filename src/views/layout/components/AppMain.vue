<template>
  <section class="app-main scroll-bar">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cashedViews">
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cashedViews() {
      return this.$store.getters.cashedViews
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  43 = tags-view*/
  position: relative;
  height: calc(100vh - 50px - 43px);
  overflow: auto;
  /* min-height: calc(100vh - 50px); */
  /* overflow: hidden; */
}
</style>
