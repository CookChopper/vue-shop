<template>
  <div class="home">
    <header class="home-header" :class="{ active: headerScroll }">
      <!-- 分类按钮 -->
      <router-link tag="i" to="/category">
        <van-icon name="wap-nav" class="category" />
      </router-link>
      <!-- 搜索框 -->
      <div class="home-search">
        <span class="logo">New Shop</span>
        <span class="gang">｜</span>
        <router-link tag="span" to="/product-list?from=home" class="search-title"> 山河无恙，人间皆安 </router-link>
      </div>
      <!-- 用户按钮 -->
      <router-link tag="i" to="/user" v-if="showLogin">
        <van-icon name="user-o" class="user"></van-icon>
      </router-link>
      <router-link tag="span" to="/login" v-else>
        <span class="login-title">登录</span>
      </router-link>
    </header>
    <!-- 轮播图组件 -->
    <swiper :list="swiperList" />
    <!-- 分类组件 -->
    <grid-list :list="categoryList" />
    <!--新品上线 -->
    <goods-list title="新品上线" :goodsList="homeInfo.newGoodses" />
    <!--热门商品 -->
    <goods-list title="热门商品" :goodsList="homeInfo.hotGoodses" />
    <!--最新推荐 -->
    <goods-list title="最新推荐" :goodsList="homeInfo.recommendGoodses" />
  </div>
</template>

<script>
import Swiper from '../components/Swiper'
import GridList from '../components/GridList'
import { getHomeInfo } from '../api/home'
export default {
  name: 'Home',
  components: {
    Swiper,
    GridList
  },
  data() {
    return {
      homeInfo: {},
      swiperList: [],
      categoryList: [
        {
          name: '新蜂超市',
          imgUrl: '//s.weituibao.com/1583585285461/cs.png',
          categoryId: 100001
        },
        {
          name: '新蜂服饰',
          imgUrl: '//s.weituibao.com/1583585285468/fs.png',
          categoryId: 100003
        },
        {
          name: '全球购',
          imgUrl: '//s.weituibao.com/1583585285470/qq.png',
          categoryId: 100002
        },
        {
          name: '新蜂生鲜',
          imgUrl: '//s.weituibao.com/1583585285472/sx.png',
          categoryId: 100004
        },
        {
          name: '新蜂到家',
          imgUrl: '//s.weituibao.com/1583585285467/dj.png',
          categoryId: 100005
        },
        {
          name: '充值缴费',
          imgUrl: '//s.weituibao.com/1583585285465/cz.png',
          categoryId: 100006
        },
        {
          name: '9.9元拼',
          imgUrl: '//s.weituibao.com/1583585285469/pt.png',
          categoryId: 100007
        },
        {
          name: '领劵',
          imgUrl: '//s.weituibao.com/1583585285468/juan.png',
          categoryId: 100008
        },
        {
          name: '省钱',
          imgUrl: '//s.weituibao.com/1583585285471/sq.png',
          categoryId: 100009
        },
        {
          name: '全部',
          imgUrl: '//s.weituibao.com/1583585285470/qb.png',
          categoryId: 100010
        }
      ],
      headerScroll: false
    }
  },
  methods: {
    async getHomeInfo() {
      const { data } = await getHomeInfo()
      this.swiperList = data.carousels
      this.homeInfo = data
    },
    pageScroll() {
      let scrollTop = window.pageYOffset
      this.headerScroll = scrollTop > 100 ? true : false
    }
  },
  created() {
    this.getHomeInfo()
  },
  mounted() {
    window.addEventListener('scroll', this.pageScroll)
  },
  computed: {
    showLogin() {
      console.log(localStorage.getItem('token'))
      return localStorage.getItem('token')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.home {
  background: @bc;
  margin-bottom: 50px;
  .home-header {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 999;
    width: 100%;
    height: 50px;
    line-height: 50px;
    .fl();
    .boxSizing();
    align-items: center;
    padding: 10px 15px;
    .category,
    .user {
      color: @primary;
    }
    &.active {
      background: @primary;
      i {
        color: #fff;
      }
    }
    .home-search {
      width: 74%;
      height: 20px;
      line-height: 20px;
      background: hsla(0, 0%, 100%, 0.7);
      padding: 5px 0;
      .borderRadius(20px);
      .logo {
        font-size: 16px;
        font-weight: 600;
        color: @primary;
      }
      .gang {
        font-size: 16px;
        margin: 0 5px 0 0;
      }
      .search-title {
        font-size: 12px;
        color: #666;
      }
    }
    i {
      font-size: 20px;
    }
  }
  .login-title {
    color: #1baeae;
    font-style: normal;
    font-size: 16px;
  }
}
</style>
