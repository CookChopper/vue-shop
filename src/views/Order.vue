<template>
  <div class="order-wrap">
    <simple-header title="我的订单" :url="'/user'" />
    <van-tabs
      v-model="status"
      :color="'#1baeae'"
      :title-active-color="'#1baeae'"
      :line-width="80"
      @change="changeTab"
      class="orderTab"
    >
      <van-tab name="" title="全部"></van-tab>
      <van-tab name="0" title="待支付"></van-tab>
      <van-tab name="1" title="待确认"></van-tab>
      <van-tab name="2" title="待发货"></van-tab>
      <van-tab name="3" title="已发货"></van-tab>
      <van-tab name="4" title="交易成功"></van-tab>
    </van-tabs>
    <!-- 订单列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="1" ref="list">
        <div
          class="order-item"
          v-for="order in orderList"
          :key="order.orderNo"
          @click="$router.push(`/order-detail/${order.orderNo}`)"
        >
          <div class="order-top">
            <span class="order-time">{{ order.createTime }}</span>
            <span class="order-status">{{ order.orderStatusString }}</span>
          </div>
          <div class="order-info" v-for="(orderItem, index) in order.newBeeMallOrderItemVOS" :key="index">
            <img :src="orderItem.goodsCoverImg" alt="" />
            <div class="order-desc">
              <p class="name">{{ orderItem.goodsName }}</p>
              <p class="title">全场包邮</p>
              <p class="price-count">
                <span class="price">¥{{ orderItem.sellingPrice }}</span>
                <span>x{{ orderItem.goodsCount }}</span>
              </p>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getOrderList } from '../api/order'
export default {
  data() {
    return {
      orderList: [], // 订单列表
      status: '', // 订单状态
      page: 1, // 当前页
      total: 0, // 订单页
      loading: false,
      finished: false,
      refreshing: false
    }
  },

  methods: {
    async init() {
      const {
        data,
        data: { list }
      } = await getOrderList({ pageNumber: this.page, status: this.status })
      this.orderList = this.orderList.concat(list)
      this.total = data.totalPage
      this.loading = false
      if (this.page >= data.totalPage) this.finished = true
    },
    changeTab(name) {
      // console.log(name)
      this.status = name
      this.onRefresh()
    },
    onLoad() {
      if (this.refreshing) {
        this.orderList = []
        this.refreshing = false
      }
      if (!this.refreshing && this.page < this.total) {
        this.page += 1
      }
      this.init()
    },
    onRefresh() {
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.page = 1
      this.total = 0
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.order-wrap {
  margin-top: 44px;
  background-color: #f9f9f9;
  .orderTab {
    border-bottom: 1px solid #eee;
  }
  .order-item {
    width: 100%;
    margin-bottom: 5px;
    background-color: #fff;
    .boxSizing();
    padding: 5px 20px;
    .order-top {
      width: 100%;
      height: 15px;
      .fl();
    }
    .order-info {
      width: 100%;
      height: 100px;
      .fl(flex-start);
      align-items: center;
      img {
        width: 80px;
        height: 80px;
      }
      .order-desc {
        text-align: left;
        margin-left: 10px;
        font-size: 14px;
        width: 100%;
        overflow: hidden;
        p {
          height: 20px;
          line-height: 20px;
        }
        .name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-weight: bold;
        }
        .title {
          color: #999;
        }
        .price-count {
          .fl();
          margin-top: 5px;
          .price {
            font-weight: bold;
          }
        }
      }
    }
  }
}
/deep/.van-tab {
  width: 80px;
}
</style>
