<template>
  <div id="app">
    <div id="nav"></div>
    <transition :name="transitionName">
      <router-view />
    </transition>
    <NavBar v-if="isShowNav" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: 'slide-left',
      isShowNav: true,
      showNavMenuList: ['/', '/home', '/category', '/cart', '/user']
    }
  },
  watch: {
    $route(to, from) {
      if (this.showNavMenuList.includes(to.path)) {
        // console.log();
        this.isShowNav = true
      } else {
        this.isShowNav = false
      }
      if (to.meta.index < from.meta.index) {
        this.transitionName = 'slide-right'
      } else if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = ''
      }
    }
  }
}
</script>
<style lang="less">
@import './common/style/mixin.less';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  // -webkit-overflow-scrolling: touch;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-leave-active,
.slide-right-enter-active {
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  backface-visibility: hidden;
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
