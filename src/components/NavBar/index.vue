<template>
  <div class="nav-bar">
    <ul class="nav-list" ref="navListRef">
      <router-link tag="li" to="home" class="nav-list-item" exact-active-class="active">
        <van-icon name="shop-o" /><span>首页</span>
      </router-link>
      <router-link tag="li" to="category" class="nav-list-item" exact-active-class="active">
        <van-icon name="goods-collect-o" /><span>分类</span>
      </router-link>
      <router-link tag="li" to="cart" class="nav-list-item" exact-active-class="active">
        <van-icon name="shopping-cart-o" :badge="count" v-if="count" />
        <van-icon name="shopping-cart-o" v-else />

        <span>购物车</span>
      </router-link>
      <router-link tag="li" to="user" class="nav-list-item" exact-active-class="active">
        <van-icon name="manager-o" /><span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.cartCount
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/style/mixin';
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 999;
  background-color: @bc;
  .nav-list {
    width: 100%;
    height: 100%;
    .fl();
    .nav-list-item {
      height: 100%;
      .fl(center);
      flex: 1;
      flex-direction: column;
      align-items: center;
      i {
        font-size: 22px;
      }
      span {
        font-size: 14px;
      }
      &.active {
        color: @primary;
      }
    }
  }
}
</style>
