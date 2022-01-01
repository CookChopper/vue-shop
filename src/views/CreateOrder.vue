<template>
  <div class="createOrder-wrap">
    <simple-header title="生成订单" />
    <!-- 地址栏 -->
    <!-- <van-contact-card :type="contactType" @click="onAddAddress" add-text="选择收货地址" /> -->
    <div class="address-wrap">
      <div class="address-info" @click="$router.push('/address')" v-if="defaultAddress">
        <div class="address-desc">
          <p>
            <span class="name">{{ defaultAddress.userName }}</span>
            <span class="tel">{{ defaultAddress.userPhone }}</span>
          </p>
          <p>
            {{
              `${defaultAddress.provinceName} ${defaultAddress.cityName} ${defaultAddress.regionName} ${defaultAddress.detailAddress}`
            }}
          </p>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="address-info" @click="$router.push('/address')" v-else>
        <van-button icon="plus" type="info" />
        <span>请选择收货地址</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <div class="goods-item" v-for="item in list" :key="item.goodsId">
        <img :src="item.goodsCoverImg" alt="" />
        <div class="goods-desc">
          <div class="goods-title">
            <p class="goods-name">{{ item.goodsName }}</p>
            <span>x{{ item.goodsCount }}</span>
          </div>
          <p class="goods-price">¥ {{ item.sellingPrice }}</p>
        </div>
      </div>
    </div>
    <!-- 付款容器 -->
    <div class="pay-wrap">
      <div class="order-info">
        <span class="title">商品金额</span>
        <span class="total">¥ {{ total }}</span>
      </div>
      <van-button @click="addOrder">生成订单</van-button>
    </div>
    <!-- 支付方式容器 -->
    <van-popup
      v-model="payShow"
      closeable
      position="bottom"
      :style="{ height: '20%' }"
      :close-on-click-overlay="false"
      @close="popupClose"
    >
      <div class="pay-container">
        <van-button type="primary" @click="payOrder(2)">微信支付</van-button>
        <van-button type="info" @click="payOrder(1)">支付宝支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getByCartItemIds } from '../api/goods'
import { getDefaultAddress, getAddressDetail } from '../api/address'
import { createOrder, paySuccess } from '../api/order'
import Cookies from 'js-cookie'
import { Toast } from 'vant'
export default {
  data() {
    return {
      cartItemIds: '', // 购物车
      list: [], // 商品列表
      defaultAddress: null, //默认地址
      payShow: false, // 支付方式弹出框
      orderNo: '' //成功下单订单号
    }
  },
  methods: {
    // 获取商品列表
    async init() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const { cartItemIds, addressId } = this.$route.query
      const _cartItemIds = cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(Cookies.get('cartItemIds'))
      this.cartItemIds = _cartItemIds
      Cookies.set('cartItemIds', cartItemIds)
      const { data } = await getByCartItemIds({ cartItemIds: _cartItemIds.join(',') })
      const { data: address } = await getDefaultAddress()
      // 默认地址
      if (address && !addressId) {
        this.defaultAddress = address
      }
      // 判断是否选择其他地址
      if (addressId) {
        const { data: address1 } = await getAddressDetail(addressId)
        this.defaultAddress = address1
      }

      this.list = data
      Toast.clear()
    },
    // 生成订单
    async addOrder() {
      try {
        const { data } = await createOrder({ addressId: this.defaultAddress.addressId, cartItemIds: this.cartItemIds })
        this.orderNo = data
        Cookies.remove('cartCount')
        Cookies.remove('cartItemIds')
        this.$store.dispatch('updateCart')

        this.payShow = true
      } catch (error) {
        console.log(error)
      }
    },
    popupClose() {
      this.payShow = false
      this.$router.push('/order')
    },
    async payOrder(type) {
      try {
        // console.log(type)
        await paySuccess({ orderNo: this.orderNo, payType: type })
        Toast.success('付款成功')
        this.$router.push('/order')
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    total() {
      let sum = 0
      this.list.forEach(item => {
        sum += item.goodsCount * item.sellingPrice
      })
      return sum
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.createOrder-wrap {
  margin-top: 44px;
  width: 100%;
  min-height: 600px;
  background-color: #eee;
  .goods-list {
    width: 100%;
    background-color: #fff;
    margin-top: 5px;
    .goods-item {
      width: 100%;
      .boxSizing();
      padding: 10px;
      .fl(flex-start);
      img {
        width: 100px;
        height: 100px;
      }
    }
    .goods-desc {
      width: 70%;
      text-align: left;
      .boxSizing();
      padding: 10px;
      .fl(center);
      flex-direction: column;
      .goods-price {
        height: 30px;
        line-height: 30px;
        color: red;
        font-size: 16px;
      }
      .goods-title {
        width: 100%;
        font-size: 16px;
        .fl();
        align-items: center;
        .goods-name {
          width: 100%;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          font-size: 14px;
          color: #999;
          margin-left: 10px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: #fff;
    .boxSizing();
    padding: 10px;
    .order-info {
      .fl();
      font-size: 18px;
      .total {
        color: red;
      }
    }

    .van-button--normal {
      width: 100%;
      height: 40px;
      font-size: 14px;
      color: #fff;
      background: -webkit-gradient(to right, #6bd8d8, #1baeae) !important;
      background: linear-gradient(to right, #6bd8d8, #1baeae);
    }
  }
  .address-wrap {
    width: 100%;
    height: 80px;
    background-color: #fff;
    .fl(flex-start);
    align-items: center;
    .address-info {
      width: 100%;
      padding: 10px;
      .boxSizing();
      padding: 10px;
      .fl();
      align-items: center;
      .address-desc {
        width: 80%;
        text-align: left;
        font-size: 14px;
        span {
          display: inline-block;
          width: auto;
          margin-right: 5px;
        }
      }
    }
    .van-button__icon {
      font-size: 22px;
    }
    span {
      display: inline-block;
      width: 70%;
      text-align: left;
      font-size: 16px;
      color: #999;
    }
    i {
      font-size: 16px;
    }
  }
}
/deep/ .pay-container {
  width: 100%;
  .boxSizing();
  padding: 20px;
  .fl(center);
  flex-direction: column;
  align-items: center;
  .van-button {
    width: 80%;
    &:nth-child(2n + 1) {
      margin-bottom: 10px;
    }
  }
}
</style>
