<template>
  <div class="category">
    <!-- 头部 -->
    <header class="category-header wrap">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <div class="header-search">
        <van-icon name="search" />
        <router-link to="./product-list?from=category" tag="span" class="search-title"> 全场五十元起步 </router-link>
      </div>
      <van-icon name="ellipsis" />
    </header>
    <!-- 内容 -->
    <div class="search-wrap" ref="searchwrap">
      <!-- 左侧 -->
      <list-scroll :scroll-data="categoryList" class="nav-side-wrapper" ref="listScroll">
        <ul class="nav-side">
          <li
            v-for="item in categoryList"
            :key="item.categoryId"
            v-text="item.categoryName"
            :class="{ active: currentIndex === item.categoryId }"
            @click="selectMenu(item.categoryId)"
          ></li>
        </ul>
      </list-scroll>
      <!-- 右侧 -->
      <div class="search-content">
        <list-scroll :scroll-data="categoryList" ref="listScroll">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <template v-for="(category, index) in categoryList">
                <div class="swiper-slide" v-if="currentIndex === category.categoryId" :key="index">
                  <div class="category-list" v-for="(products, index) in category.secondLevelCategoryVOS" :key="index">
                    <p class="category-title">{{ products.categoryName }}</p>
                    <div
                      class="category-item"
                      v-for="(product, index) in products.thirdLevelCategoryVOS"
                      :key="index"
                      @click="search(product.categoryId)"
                    >
                      <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" class="product-img" />
                      <p>{{ product.categoryName }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory } from '../api/category'
export default {
  data() {
    return {
      categoryList: [],
      currentIndex: 15
    }
  },
  methods: {
    async getCategory() {
      const { data } = await getCategory()
      this.categoryList = data
    },
    selectMenu(id) {
      this.currentIndex = id
    },
    setWrapHeight() {
      let $screenHeight = document.documentElement.clientHeight
      this.$refs.searchwrap.style.height = $screenHeight - 100 + 'px'
    },
    search(id) {
      this.$router.push(`/product-list?categoryId=${id}`)
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.listScroll.initScroll()
      // console.log(this.$refs.listScroll.scroll)
    })
  },
  mounted() {
    this.setWrapHeight()
    this.getCategory()
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.category {
  .category-header {
    position: fixed;
    left: 0;
    top: 0;
    .fl();
    width: 100%;
    height: 40px;
    align-items: center;
    padding: 10px;
    .boxSizing();
    font-size: 14px;

    .header-search {
      width: 74%;
      height: 20px;
      line-height: 20px;
      .borderRadius(20px);
      background: #f7f7f7;
      padding: 5px;
      text-align: left;
      padding-left: 15px;
      .search-title {
        margin-left: 10px;
      }
    }
  }
  .search-wrap {
    width: 100%;
    margin-top: 50px;
    background: #f8f8f8;
    border-top: 1px solid #999;
    .fl(flex-start);
    .nav-side-wrapper {
      width: 28%;
      height: 100%;
      overflow: hidden;
      .nav-side {
        width: 100%;
        .boxSizing();
        background: #f8f8f8;
        li {
          width: 100%;
          height: 56px;
          line-height: 56px;
          text-align: center;
          font-size: 14px;
          &.active {
            color: @primary;
            background-color: #fff;
          }
        }
      }
    }
    .search-content {
      width: 72%;
      height: 100%;
      background-color: #fff;
      .boxSizing();
      .swiper-container {
        width: 100%;
        .swiper-wrapper {
          width: 100%;
          .category-list {
            display: flex;
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            .category-title {
              width: 100%;
              font-size: 17px;
              padding: 20px 0;
              text-align: left;
              padding-left: 10px;
              .boxSizing();
            }
            .category-item {
              width: 33.33%;
              img {
                .wh(30px,30px);
              }
              text-align: center;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
