<template>
  <div class="product-detail-wrap">
    <simple-header title="商品详情" />
    <div class="product-detail">
      <!-- <div class="">
        <img :src="`http://backend-api-01.newbee.ltd${detail.goodsCoverImg}`" alt="" />
      </div> -->
      <van-swipe @change="onChange" class="product-detail-img">
        <van-swipe-item v-for="(item, index) in detail.goodsCarouselList" :key="index">
          <img :src="`${item}`" alt=""
        /></van-swipe-item>

        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{ total }}</div>
        </template>
      </van-swipe>
      <div class="product-detail-desc">
        <p class="goodsname">{{ detail.goodsName }}</p>
        <p class="info">免邮费 顺丰包邮</p>
        <p class="price">¥{{ detail.sellingPrice }}</p>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="goods-detail" v-html="detail.goodsDetailContent"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />

      <van-goods-action-icon icon="cart-o" text="购物车" :badge="count" v-if="count" @click="$router.push('/cart')" />
      <van-goods-action-icon icon="cart-o" text="购物车" v-else @click="$router.push('/cart')" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="goToBuy" />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getGoodDetail, addCart } from '../api/goods'
// import { getGoodDetail } from '../api/goods'
export default {
  data() {
    return {
      detail: {},
      current: 0,
      total: 1
    }
  },
  methods: {
    onChange(index) {
      // console.log(index)
      this.current = index
    },
    async getGoodDetail(id) {
      const { data } = await getGoodDetail(id)
      this.detail = data
      this.total = data.goodsCarouselList.length
    },
    async addCart() {
      const goodsId = this.$route.params.id
      const { resultCode } = await addCart({ goodsCount: 1, goodsId: goodsId })
      if (resultCode === 200) Toast.success('添加成功')
      this.$store.dispatch('updateCart')
    },
    async goToBuy() {
      await this.addCart()
      this.$router.push('/cart')
    }
  },
  mounted() {
    const { id } = this.$route.params
    // console.log(id)
    this.getGoodDetail(id)
  },
  computed: {
    count() {
      return this.$store.state.cartCount
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.product-detail-wrap {
  margin-top: 44px;
  width: 100%;
  .product-detail-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .product-detail-desc {
    width: 100%;
    height: 100%;
    .boxSizing();
    padding-left: 10px;
    text-align: left;
    p {
      margin: 5px 0;
      width: 100%;
      height: 20px;
      line-height: 20px;
    }
    .goodsname {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 18px;
    }
    .info {
      font-size: 14px;
      color: #999;
    }
    .price {
      font-size: 20px;
      color: #f63515;
    }
  }
  .product-intro {
    width: 100%;
    height: 100%;
    ul {
      padding: 10px;
      .fl();
      height: 30px;
      font-size: 16px;
      align-items: center;
      li {
        text-align: center;
        flex: 1;
        border-right: 1px solid #ccc;
      }
    }
    .goods-detail /deep/ img {
      width: 100%;
    }
  }
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
<style lang="less">
.van-goods-action {
  width: 100%;
}
.van-goods-action-button--warning,
.van-goods-action-button--danger {
  // background: -webkit-gradient(90dag, #6bd8d8, #1baeae);
  background: linear-gradient(to right, #6bd8d8, #1baeae) !important;
}
</style>
