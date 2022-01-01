<template>
  <div class="setting-wrap">
    <simple-header title="账号管理" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="userInfo.nickName"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field v-model="userInfo.introduceSign" name="个性签名" label="个性签名" placeholder="个性签名" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" />
      <div style="margin: 16px" class="buttonWrap">
        <van-button block type="info" native-type="submit">提交</van-button>
        <van-button block type="default" @click="logout" native-type="button">退出登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getUserInfo, logout, editUserInfo } from '../api/user'
import { Toast } from 'vant'
export default {
  data() {
    return {
      userInfo: {},
      password: ''
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data
      console.log(data)
    },
    async onSubmit() {
      await editUserInfo({
        introduceSign: this.userInfo.introduceSign,
        nickName: this.userInfo.nickName,
        passwordMd5: this.$md5(this.password)
      })
      Toast.success('保存成功')
    },
    async logout() {
      await logout()
      localStorage.removeItem('token')
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.setting-wrap {
  margin-top: 44px;
}
.buttonWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.van-button {
  width: 80%;
  border: none;
  &:nth-child(2n + 1) {
    margin-bottom: 5px;
  }
  background-color: #1baeae;
  color: #fff;
  outline: none;
}
</style>
