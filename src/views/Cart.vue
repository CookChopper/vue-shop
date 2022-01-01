<template>
  <div class="cart-wrap">
    <simple-header title="购物车" />
    <div class="cart-body">
      <van-checkbox-group v-model="result">
        <van-swipe-cell v-for="item in cartList" :key="item.goodsId" :right-width="50">
          <van-checkbox :name="item.cartItemId"></van-checkbox>
          <div class="goods-desc">
            <img :src="item.goodsCoverImg" alt="" />
            <div class="goods-info">
              <p class="goods-name">{{ item.goodsName }}</p>
              <p class="goods-count">X{{ item.goodsCount }}</p>
              <div class="cart-item">
                <span class="price">¥{{ item.sellingPrice }}</span>
                <van-stepper
                  v-model="item.goodsCount"
                  :min="1"
                  integer
                  async-change
                  :name="item.cartItemId"
                  @change="countChange"
                />
              </div>
            </div>
          </div>
          <template #right>
            <van-button square type="danger" icon="delete-o" @click="delGoodCart(item.cartItemId)" />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" v-if="cartList.length > 0">
      <van-checkbox @click="changeAll" v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { getCart, editCart, delCart } from '../api/goods'
import { Toast } from 'vant'
export default {
  data() {
    return {
      cartList: [],
      result: [],
      checkAll: true
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    total() {
      let sum = 0
      let _list = this.cartList.filter(item => this.result.includes(item.cartItemId))
      _list.forEach(item => {
        sum += item.goodsCount * item.sellingPrice * 100
      })
      // console.log(_list)
      return sum
    }
  },
  methods: {
    async init() {
      Toast.loading({ message: '加载中...', forbidClick: true })
      const { data } = await getCart()
      this.cartList = data
      this.result = data.map(item => item.cartItemId)
      Toast.clear()
      console.log(data)
    },
    async countChange(value, detail) {
      // console.log(arguments)
      Toast.loading({ message: '加载中...', forbidClick: true })
      await editCart({ cartItemId: detail.name, goodsCount: value })
      this.cartList.forEach(item => {
        if (item.cartItemId === detail.name) {
          item.goodsCount = value
        }
      })
      Toast.clear()
    },
    changeAll() {
      if (this.checkAll) {
        // console.log(1)
        this.result = this.cartList.map(item => item.cartItemId)
      } else {
        // console.log(2)
        this.result = []
      }
    },
    onSubmit() {
      const params = JSON.stringify(this.result)
      this.$router.push(`/create-order?cartItemIds=${params}`)
    },
    async delGoodCart(id) {
      await delCart(id)
      this.$store.dispatch('updateCart')

      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.cart-wrap {
  margin-top: 44px;
  margin-bottom: 100px;
  .cart-body {
    width: 100%;
    padding: 0 0 0 5px;
    .boxSizing();
    /deep/ .van-swipe-cell__wrapper {
      width: 100%;
      height: 100%;
      .fl(flex-start);
      .van-checkbox {
        width: 25px;
      }
      .goods-desc {
        width: 100%;
        margin-left: 5px;
        align-items: center;
        .fl(flex-start);
        .goods-info {
          width: 100%;
          .boxSizing();
          padding: 15px;
          text-align: left;
          .goods-name {
            font-size: 14px;
          }
          .cart-item {
            width: 100%;
            padding: 15px 0;
            .boxSizing();
            .fl();
            .price {
              font-size: 16px;
            }
          }
        }
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
}
.van-swipe-cell__right button {
  width: 50px;
  height: 100%;
}
.van-submit-bar {
  bottom: 50px;
}
</style>
