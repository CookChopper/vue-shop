<template>
  <div class="GridList">
    <div class="GridListItem" v-for="item in list" :key="item.categoryId">
      <img :src="item.imgUrl" alt="" />
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridList',
  props: {
    list: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.GridList {
  width: 100%;
  margin-bottom: 10px;
  .fl();
  flex-direction: row;
  flex-wrap: wrap;
  .GridListItem {
    .fl();
    flex-direction: column;
    width: 20%;
    align-items: center;
    .boxSizing();
    padding: 5px;
    img {
      padding: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
