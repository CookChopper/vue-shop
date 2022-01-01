<template>
  <div class="order-detail-wrap">
    <simple-header title="订单详情" />
    <div class="order-info">
      <p>
        订单状态：<span>{{ orderInfo.orderStatusString }}</span>
      </p>
      <p>
        订单编号：<span>{{ orderInfo.orderNo }}</span>
      </p>
      <p>
        下单时间：<span>{{ orderInfo.createTime }}</span>
      </p>
      <van-button type="success" @click="finishOrder" v-if="orderInfo.payType !== 0">确认收货</van-button>
      <van-button type="success" @click="showPay = true" v-else>待支付</van-button>
      <van-button type="default" @click="cancelOrder">取消订单</van-button>
    </div>
    <div class="express-info">
      <p>
        商品金额：<span>¥{{ orderInfo.totalPrice }}</span>
      </p>
      <p>配送方式：<span>普通快递</span></p>
    </div>
    <div class="order-list">
      <div class="order-item" v-for="(item, index) in orderInfo.newBeeMallOrderItemVOS" :key="index">
        <img :src="item.goodsCoverImg" alt="" />
        <div class="order-item-desc">
          <p class="goodsname">{{ item.goodsName }}</p>
          <p class="title">全场包邮</p>
          <p class="price-count">
            <span>¥{{ item.sellingPrice }}</span>
            <span class="count">x{{ item.goodsCount }}</span>
          </p>
        </div>
      </div>
    </div>
    <van-action-sheet
      v-model="showPay"
      :actions="actions"
      @select="selectPay"
      cancel-text="取消"
      close-on-click-action
      @cancel="showPay = false"
    ></van-action-sheet>
  </div>
</template>

<script>
import { getOrderDetail, finishOrder, cancelOrder, paySuccess } from '../api/order'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      id: this.$route.params.id,
      orderInfo: {},
      showPay: false,
      actions: [{ name: '支付宝支付' }, { name: '微信支付' }]
    }
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      const { data } = await getOrderDetail(this.id)
      this.orderInfo = data
      console.log(data)
    },
    // 确认收货
    finishOrder() {
      Dialog.confirm({
        title: '是否确认收货'
      })
        .then(async () => {
          await finishOrder(this.id)
          this.getOrderDetail()
        })
        .catch(() => {
          // on cancel
        })
    },
    // 取消订单
    cancelOrder() {
      Dialog.confirm({
        title: '是否取消订单'
      })
        .then(async () => {
          await cancelOrder(this.id)
          this.getOrderDetail()
        })
        .catch(() => {
          // on cancel
        })
    },
    async selectPay({ name }, index) {
      console.log(name, index)
      await paySuccess({ orderNo: this.id, payType: index + 1 })
      this.showPay = false
      this.getOrderDetail()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';

.order-detail-wrap {
  margin-top: 44px;

  .order-info,
  .express-info {
    width: 100%;
    margin-bottom: 10px;
    .boxSizing();
    padding: 20px;
    background-color: #fff;
    font-size: 15px;
    text-align: center;
    p {
      text-align: left;

      margin: 8px 0;
      color: #999;
      span {
        color: #000;
      }
    }

    .van-button {
      display: block;
      width: 100%;
      &:nth-child(2n) {
        margin-bottom: 10px;
      }
      &.van-button--success {
        color: #fff;
        background-color: @primary;
      }
      &.van-button--default {
        border: 1px solid #eee;
      }
    }
  }
  .order-list {
    width: 100%;
    background-color: #fff;
    .order-item {
      width: 100%;
      .boxSizing();
      padding: 20px;
      .fl(flex-start);
      img {
        width: 80px;
        height: 80px;
      }
      .order-item-desc {
        width: 100%;
        overflow: hidden;
        p {
          text-align: left;
          font-size: 15px;
          margin: 5px 0;
          &.goodsname {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &.price-count {
            .fl();
            .count {
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
body {
  background-color: #f9f9f9 !important;
}
</style>
