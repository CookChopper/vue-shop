<template>
  <div>
    <SimpleHeader title="登录" />

    <div class="login" v-if="type === 'login'">
      <div class="logo">
        <span>NewShop</span>
      </div>
      <van-form @submit="onSubmit" class="login-form" ref="loginFormRef">
        <van-field
          v-model="formData.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="formData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          autocomplete
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <Verify
          @success="success"
          @error="error"
          :type="2"
          :figure="10"
          fontSize="16px"
          :showButton="false"
          width="2.85rem"
          height="1.1rem"
          ref="loginVerify"
        ></Verify>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <div class="register" v-else>
      <div class="logo">
        <span>NewShop</span>
      </div>
      <van-form @submit="onSubmit" class="login-form" ref="loginFormRef">
        <van-field
          v-model="formData.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          autocomplete
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="formData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <Verify
          @success="success"
          @error="error"
          :type="2"
          :figure="10"
          fontSize="16px"
          :showButton="false"
          width="2.85rem"
          height="1.1rem"
          ref="loginVerify"
        ></Verify>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
    <div class="type">
      <span v-if="type === 'login'" @click="toggle('register')">去注册</span>
      <span v-else @click="toggle('login')">已有登录账号</span>
    </div>
  </div>
</template>

<script>
import Verify from 'vue2-verify'
import { Toast } from 'vant'
import { login, register } from '@/api/user.js'
import { setLocal } from '../utils/index'
export default {
  components: {
    Verify
  },
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      type: 'login',
      verify: false
    }
  },
  methods: {
    async onSubmit(values) {
      this.checkCode()
      if (!this.verify) {
        return Toast.fail('请输入通过验证吗！')
      }
      if (this.type === 'login') {
        // 登录
        try {
          // console.log(this.formData.username)
          console.log(values)
          const { data } = await login({
            loginName: values.username,
            passwordMd5: this.$md5(values.password)
          })
          Toast.success('登录成功')
          setLocal('token', data)
          this.$router.push('/')
          // console.log(data, resultCode)
        } catch (error) {
          Toast.fail('登录失败')
          console.log(error)
        }
      } else {
        // 注册
        try {
          await register({
            loginName: values.username,
            password: values.password
          })
          Toast.success('注册成功')
          this.toggle('login')
        } catch (error) {
          Toast.fail('注册失败')
          console.log(error)
        }
      }
    },
    toggle(type) {
      this.verify = false
      this.type = type
      this.formData = {
        username: '',
        password: ''
      }
      this.$refs.loginFormRef.resetValidation()
      this.$refs.loginVerify.$refs.instance.refresh()
    },
    checkCode() {
      this.$refs.loginVerify.$refs.instance.checkCode()
      this.$refs.loginVerify.$refs.instance.refresh()
    },
    success() {
      this.verify = true
    },
    error() {
      this.verify = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/mixin';
.login,
.register {
  .logo {
    margin-top: 100px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 50%;
    padding: 20px;
    border: 1px solid #eee;
    font-size: 30px;
    span {
      color: @primary;
    }
  }
  .login-form {
    padding: 10px 20px !important;
  }
}
.type {
  color: @primary;
  font-size: 14px;
}
</style>
<style lang="less">
.cerify-code-panel {
  margin-top: 10px !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  .verify-code-area {
    display: flex;
    // align-items: center !important;
    width: 160px !important;
    margin-left: 10px;
    margin-top: -5px;
    .verify-change-area {
      width: 50px !important;
      margin-left: 10px;
      margin-top: 6px;
    }
    .varify-input-code {
      width: 100px !important;
      height: 38px;
      border: 1px solid #eee;
    }
  }
}
</style>
