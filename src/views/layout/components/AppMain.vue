<template>
  <section class="app-main scroll-bar">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view v-if="!reloading"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.getters.cachedViews
    },
    reloading() {
      return this.$store.getters.reloading
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
}
</style>
