<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="product-search wrap">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
        <div class="search">
          <van-icon name="search" />
          <input type="text" />
        </div>
        <van-button round type="info">搜索</van-button>
      </header>
      <van-tabs @click="changeTag" type="card" color="#1baeae">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh v-model="refreshed" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" @offset="300">
        <div
          class="product-item"
          v-for="(item, index) in list"
          :key="index"
          @click="$router.push(`/product/${item.goodsId}`)"
        >
          <img :src="`http://backend-api-01.newbee.ltd${item.goodsCoverImg}`" alt="" />
          <div class="product-desc">
            <p class="goodsname">{{ item.goodsName }}</p>
            <p class="goodsIntro">{{ item.goodsIntro }}</p>
            <p class="sellingPrice">¥ &nbsp;{{ item.sellingPrice }}</p>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { search } from '../api/goods'
export default {
  data() {
    return {
      list: [],
      loading: false, //是否加载中
      finished: false, // 是否没有更多可以加载
      keyword: this.$route.query.keyword || '', //搜索关键词
      totalPage: 0, // 页码总数
      page: 1, // 页码
      orderBy: '',
      refreshed: false //下拉刷新
    }
  },
  methods: {
    changeTag(type) {
      // console.log(type)
      this.orderBy = type
      this.onRefresh()
    },
    // 初始化列表数据
    async init() {
      const { categoryId } = this.$route.query
      if (!categoryId && !this.keyword) {
        Toast.fail('请输入关键词')
        this.loading = false
        this.finished = true
        return
      }
      // 搜索数据
      const {
        data,
        data: { list }
      } = await search({
        keyword: this.keyword,
        goodsCategoryId: categoryId,
        orderBy: this.orderBy,
        pageNumber: this.page
      })
      // 拼接商品数据
      this.list = this.list.concat(list)
      // 当前页
      this.page = data.currPage
      // 总页
      this.totalPage = data.totalPage
      // 关闭加载
      this.loading = false
      // 判断是否全部加载完
      if (this.page >= data.totalPage) this.finished = true
    },
    onLoad() {
      // 判断是否上拉刷新 且 还没加载完
      if (!this.refreshed && this.page < this.totalPage) {
        this.page += 1
      }
      // 是上拉刷新
      if (this.refreshed) {
        this.list = [] // 清空数据
        this.refreshed = false // 将上拉刷新调为false
      }
      // 在加载一次数据
      this.init()
    },
    // 下拉刷新
    onRefresh() {
      this.refreshed = true // 上拉刷新设为true
      this.finished = false // 未全部加载完
      this.loading = true // 设为true 重新加载数据
      this.page = 1 // 初始化页码
      this.onLoad() // 重新加载
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.product-list-wrap {
  width: 100%;
}
.product-list-content {
  width: 100%;
  .product-search {
    width: 100%;
    height: 50px;
    .boxSizing();
    .fl();
    padding: 0 10px;
    align-items: center;
    font-size: 16px;

    .search {
      width: 70%;
      height: 30px;
      line-height: 30px;
      background: #f7f7f7;
      .borderRadius(30px);
      .fl(flex-start);
      align-items: center;
      .van-icon-search {
        margin: 0 15px;
      }
      input {
        padding: 0;
        height: 30px;
        background: #f7f7f7;
      }
    }
  }
}
.product-item {
  width: 100%;
  .boxSizing();
  .fl(center);
  padding: 10px;
  img {
    .wh(150px,150px);
  }
  .product-desc {
    margin-left: 10px;
    p {
      width: 200px;
      font-size: 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
      overflow: hidden;
      &.goodsIntro {
        font-size: 14px;
        color: #ccc;
      }
      &.sellingPrice {
        color: @primary;
      }
    }
  }
}
.van-button {
  width: 60px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  background: @primary;
}
</style>
