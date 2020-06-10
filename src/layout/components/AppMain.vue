<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive> -->
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  position: relative;
  width: 100%;
  height: calc(100vh - 86px);
  overflow: hidden;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background: #e4e4e4;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #9466ff;
    background-image: -webkit-linear-gradient(
      45deg,
      hsla(0, 0%, 100%, 0.2) 25%,
      transparent 0,
      transparent 50%,
      hsla(0, 0%, 100%, 0.2) 0,
      hsla(0, 0%, 100%, 0.2) 75%,
      transparent 0,
      transparent
    );
  }
}
</style>
