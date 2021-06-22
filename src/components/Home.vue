<template>
  <div style="height:100%">
    <el-container>
      <el-header>
        <div class="logo_box">
          <img src="../assets//heima.png"
               alt="">
          <span>电商后台管理</span>
        </div>
        <el-button type="info"
                   @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  methods: {
    async logout () {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('用户取消操作')
      window.sessionStorage.clear()
      this.$message.success('退出成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo_box {
    color: #fff;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 10px;
  }
}
.el-container {
  height: 100%;
}

.el-aside {
  background-color: #333744;
  height: 100%;
}
.el-main {
  background-color: #eaedf1;
  height: 100%;
}
</style>
