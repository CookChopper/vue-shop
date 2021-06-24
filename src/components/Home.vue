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
        <!-- 左侧菜单 -->
        <el-aside :width="isCollapse ? '64px':'200px'">
          <div class="collapseBtn"
               @click="isCollapse = !isCollapse">|||</div>
          <el-menu :default-active="DefaultActive"
                   background-color="#333744"
                   text-color="#fff"
                   active-text-color="#409EEF"
                   router
                   :collapse="isCollapse"
                   :collapse-transition="false"
                   unique-opened>
            <el-submenu :index="item.path"
                        v-for="item in menulist"
                        :key="item.id">
              <template slot="title">
                <i :class="['iconfont',iconmenu[item.id]]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item :index="SubItem.path"
                            v-for="SubItem in item.children"
                            :key="SubItem.id"
                            @click="showActive(SubItem.path)">
                <i class="el-icon-menu"></i>
                {{SubItem.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menulist: [],
      // 图标数据
      iconmenu: {
        125: 'icon-users',
        103: 'icon-tijikongjian',
        101: 'icon-shangpin',
        102: 'icon-danju',
        145: 'icon-baobiao'
      },
      // 控制左侧菜单栏收缩
      isCollapse: false,
      DefaultActive: ''
    }
  },
  methods: {
    // 退出
    async logout () {
      const confirmResult = await this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('用户取消操作')
      window.sessionStorage.clear()
      this.$message.success('退出成功')
      this.$router.push('/login')
    },
    // 获取侧边栏数据
    async getMenusList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('获取左边菜单栏数据失败')
      this.menulist = res.data
    },
    // 设置默认左侧菜单栏激活
    showActive (item) {
      // console.log(item)
      window.sessionStorage.setItem('activePath', item)
      this.DefaultActive = item
    }
  },
  created () {
    this.getMenusList()
    this.DefaultActive = window.sessionStorage.getItem('activePath')
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
  min-height: 100%;
}

.el-aside {
  background-color: #333744;
  min-height: 100%;
  .el-menu-item {
    font-size: 12px;
  }
}
.el-main {
  background-color: #eaedf1;
  min-height: 100%;
}
.iconfont {
  margin-right: 10px;
}
.collapseBtn {
  height: 30px;
  background-color: #4a5064;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
</style>
