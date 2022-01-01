<template>
  <div class="goodslist">
    <div class="title">{{ title }}</div>
    <div class="list">
      <div class="item" v-for="item in goodsList" :key="item.goodsId" @click="$router.push(`/product/${item.goodsId}`)">
        <img :src="item.goodsCoverImg" alt="" v-imagerror="defaultImg" />
        <p class="goodsname">{{ item.goodsName }}</p>
        <span class="price">¥{{ item.sellingPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  props: {
    title: {
      type: String,
      default: ''
    },
    goodsList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      defaultImg: 'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mate40pro%2B.png'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.goodslist {
  width: 100%;
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: @primary;
    font-weight: 600;
    font-size: 16px;
    background-color: #eee;
  }
  .list {
    width: 100%;
    .fl(flex-start);
    flex-direction: row;
    flex-wrap: wrap;
    .item {
      .boxSizing();
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 0;
      .fl(center);
      flex-direction: column;
      align-items: center;
      img {
        width: 112px;
        margin: 0 a uto;
      }
      .goodsname,
      .price {
        text-align: center;
        font-size: 14px;
      }
      .goodsname {
        width: 80%;
        text-align: center;
        color: #222333;
      }
      .price {
        color: @primary;
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
</style>
