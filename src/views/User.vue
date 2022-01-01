<template>
  <div class="user">
    <simple-header title="我的" />
    <div class="user-info">
      <!-- 用户信息 -->
      <div class="info">
        <img src="//s.weituibao.com/1583583975067/user-graduate%20(1).png" alt="" />
        <div class="user-desc">
          <span>昵称: {{ userInfo.nickName }}</span>
          <span>登录名: {{ userInfo.loginName }}</span>
          <span class="name">个性签名: {{ userInfo.introduceSign }}</span>
        </div>
      </div>
      <div class="user-list">
        <ul class="list">
          <li @click="$router.push('/order')">
            <span>我的订单</span>
            <van-icon name="arrow" />
          </li>
          <li @click="$router.push('/setting')">
            <span>账号管理</span>
            <van-icon name="arrow" />
          </li>
          <li @click="$router.push('/address?from=mine')">
            <span>地址管理</span>
            <van-icon name="arrow" />
          </li>
          <li>
            <span>关于我们</span>
            <van-icon name="arrow" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '../api/user'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.user {
  margin-top: 40px;
  margin-bottom: 50px;
  padding: 0 10px;
}
.user-info {
  width: 100%;
  padding: 10px 0px;
  .boxSizing();
  .info {
    width: 100%;
    height: 115px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    .fl();
    .boxSizing();
    justify-content: left;
    align-items: center;
    padding: 20px;
    .borderRadius(20px);
    img {
      width: 70px;
      height: 70px;
      .borderRadius(50%);
    }
    .user-desc {
      display: flex;
      flex-direction: column;
      align-items: left;
      margin-left: 20px;
      span {
        text-align: left;
        font-size: 14px;
        padding: 3px 0;
        color: #fff;
      }
    }
  }
}
.user-list {
  width: 100%;
  padding: 20px 10px;
  .boxSizing();
  li {
    .fl();
    width: 100%;
    height: 30px;
    padding: 5px;
    line-height: 30px;
    align-items: center;
    .border-1px(#eee);
    font-size: 14px;
  }
}
</style>
