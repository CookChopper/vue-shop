<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容"
                    v-model="searchIpt"
                    class="input-with-select"
                    clearable
                    @clear="searchBtn">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="searchBtn"></el-button>
          </el-input>
        </el-col>
        <el-col :span="14">
          <el-button type="primary"
                     @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户数据列表 -->
      <el-table :data="userlist"
                style="width: 100%"
                border
                swiper>
        <el-table-column type="index"
                         label="#">
        </el-table-column>
        <el-table-column prop="username"
                         label="用户名">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="电话">
        </el-table-column>
        <el-table-column prop="role_name"
                         label="角色">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"
                       @change="mgStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="200">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-edit"
                       @click="showEditDialog(scope.row.id)"></el-button>
            <el-button type="danger"
                       size="mini"
                       icon="el-icon-delete"
                       @click="deleteUser(scope.row.id)"></el-button>
            <el-tooltip class="item"
                        effect="dark"
                        content="分配权限"
                        placement="top"
                        :enterable='false'>
              <el-button type="warning"
                         size="mini"
                         icon="el-icon-setting"
                         @click="showRoleDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[2,5,10,20]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户"
               :visible.sync="addDialogVisible"
               width="50%"
               @close="addDialogClosed">
      <el-form :model="addUserForm"
               :rules="addUserFormRules"
               ref="addUserFormRef"
               label-width="100px">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="addUserForm.password"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="添加用户"
               :visible.sync="editDialogVisible"
               width="50%"
               @close="editDialogClosed">
      <el-form :model="editUserForm"
               :rules="editUserFormRules"
               ref="editUserFormRef"
               label-width="100px">
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色"
               :visible.sync="editRolesVisible"
               width="50%"
               @close="editRolesDialogClosed">
      <el-form label-width="120px">
        <el-form-item label="当前的用户:">
          <el-input v-model="nowUser.username"
                    :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="当前的角色:">
          <el-input v-model="nowUser.role_name"
                    :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="分配新角色:">
          <el-select v-model="seletedRoleId"
                     placeholder="请选择">
            <el-option v-for="item in roleslist"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editRolesVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="setRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    var checkemail = (rule, value, callback) => {
      const EmailReg = /^\w+@\w+\.\w+$/
      if (!EmailReg.test(value)) {
        return callback(new Error('请输入合法的邮箱'))
      }
      callback()
    }
    var checkPwd = (rule, value, callback) => {
      const Pwdreg = /^1[34578][0-9]{9}$/
      if (!Pwdreg.test(value)) {
        return callback(new Error('请输入合法的手机号'))
      }
      callback()
    }
    return {
      searchIpt: '',
      // 获取用户请求数据
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      // 数据总和
      total: 0,
      // 用户数据列表
      userlist: [],
      // 对话框显示与隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      //
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
      },
      addUserFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 12, message: '请输入3-12位字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 15, message: '请输入6-15位字符', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkemail, trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: checkPwd, trigger: 'blur' }]
      },
      editUserFormRules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkemail, trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: checkPwd, trigger: 'blur' }]
      },
      editRolesVisible: false,
      nowUser: {},
      roleslist: [],
      seletedRoleId: ''
    }
  },
  methods: {
    // 获取用户数据列表
    async getUsersList () {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户数据失败')
      }
      this.userlist = res.data.users
      this.total = res.data.total
      console.log(res.data)
    },
    // 修改用户状态
    async mgStateChanged (row) {
      // console.log(row)
      const { data: res } = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
      if (res.meta.status !== 200) return this.$message.error('修改用户状态失败')
      this.$message.success(res.meta.msg)
      this.getUsersList()
    },
    // 分页显示
    handleSizeChange (NewSize) {
      this.queryInfo.pagesize = NewSize
      this.getUsersList()
    },
    handleCurrentChange (NewNum) {
      this.queryInfo.pagenum = NewNum
      this.getUsersList()
    },
    // 搜索按钮
    searchBtn () {
      this.queryInfo.query = this.searchIpt
      this.getUsersList()
    },
    // 关闭添加用户对话框
    addDialogClosed () {
      this.$refs.addUserFormRef.resetFields()
    },
    addUser () {
      this.$refs.addUserFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addUserForm)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getUsersList()
        this.addDialogVisible = false
      })
    },
    // 展示编辑用户对话框
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.editUserForm = res.data
      this.editDialogVisible = true
    },
    editDialogClosed () {
      this.$refs.editUserFormRef.resetFields()
    },
    editUserInfo () {
      this.$refs.editUserFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + this.editUserForm.id, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        })
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getUsersList()
        this.editDialogVisible = false
      })
    },
    async deleteUser (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('用户取消操作')
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getUsersList()
    },
    async showRoleDialog (row) {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.roleslist = res.data
      this.nowUser = row
      this.editRolesVisible = true
    },
    editRolesDialogClosed () {
      this.seletedRoleId = ''
    },
    async setRoles () {
      const { data: res } = await this.$http.put(`users/${this.nowUser.id}/role`, {
        rid: this.seletedRoleId
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getUsersList()
      this.editRolesVisible = false
    }
  },
  created () {
    this.getUsersList()
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 15px;
  border: 1px solid #ebeef5;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.el-table {
  margin-top: 15px;
}
</style>
