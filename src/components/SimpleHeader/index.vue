<template>
  <div class="simple-header">
    <van-icon name="arrow-left" @click="goBack"></van-icon>
    <span>{{ title }}</span>
    <van-icon name="weapp-nav"></van-icon>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    url: {
      type: String
    }
  },
  methods: {
    goBack() {
      if (this.url) {
        return this.$router.push(this.url)
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.simple-header {
  position: fixed !important;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 44px;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  background-color: @bc;
  .border-1px(#eee);
  .fl();
  padding: 5px 10px;
  .boxSizing();
}
</style>
