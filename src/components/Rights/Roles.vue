<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card"
             style="margin-top:15px;">
      <el-row>
        <el-col>
          <el-button type="primary"
                     @click="addDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="roleslist"
                style="width: 100%;margin:10px 0;"
                border
                swiper>
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <el-row v-for="(item1) in row.children"
                    :key="item1.id"
                    class="Row1">
              <el-col :span="8"
                      class="Col1">
                <el-tag type="primary"
                        closable
                        @close="deleteRight(row,item1.id)">{{item1.authName}}</el-tag> <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="16">
                <el-row v-for="(item2) in item1.children"
                        :key="item2.id"
                        class="Row2">
                  <el-col :span="8"
                          class="Col1">
                    <el-tag type="success"
                            closable
                            @close="deleteRight(row,item2.id)">{{item2.authName}}</el-tag> <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag v-for="item3 in item2.children"
                            :key="item3.id"
                            type="warning"
                            closable
                            @close="deleteRight(row,item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"
                         label="#">
        </el-table-column>
        <el-table-column prop="roleName"
                         label="角色名称">
        </el-table-column>
        <el-table-column prop="roleDesc"
                         label="角色描述">
        </el-table-column>
        <el-table-column label="操作"
                         width="300">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-edit"
                       @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger"
                       size="mini"
                       icon="el-icon-delete"
                       @click="deleteRoles(scope.row.id)">删除</el-button>
            <el-button type="warning"
                       size="mini"
                       icon="el-icon-setting"
                       @click="showEditRightsDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加角色"
               :visible.sync="addDialogVisible"
               width="50%"
               @close="addDialogClosed">
      <el-form :model="addRolesForm"
               :rules="addRolesFormRules"
               ref="addRolesFormRef"
               label-width="100px">
        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addRolesSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑角色"
               :visible.sync="editDialogVisible"
               width="50%"
               @close="editDialogClosed">
      <el-form :model="editRolesForm"
               :rules="editRolesFormRules"
               ref="editRolesFormRef"
               label-width="100px">
        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editRolesSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配权限"
               :visible.sync="RightsDialogVisible"
               width="50%"
               @close="RightsDialogClosed">
      <el-tree :data="rightslist"
               :props="defaultProps"
               node-key="id"
               default-expand-all
               show-checkbox
               :default-checked-keys="defKeys"
               ref="treeRef"></el-tree>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="RightsDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editRightsSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roleslist: [],
      rightslist: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      roleId: '',
      defKeys: [],
      addDialogVisible: false,
      editDialogVisible: false,
      RightsDialogVisible: false,
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      addRolesFormRules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      editRolesForm: {},
      editRolesFormRules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.roleslist = res.data
      // console.log(this.roleslist)
    },
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.editRolesForm = res.data
      this.editDialogVisible = true
    },
    async deleteRoles (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('用户取消操作')
      const { data: res } = await this.$http.delete('roles/' + id)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getRolesList()
    },
    addRolesSubmit () {
      this.$refs.addRolesFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('roles', this.addRolesForm)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getRolesList()
        this.addDialogVisible = false
      })
    },
    addDialogClosed () {
      this.$refs.addRolesFormRef.resetFields()
    },
    editRolesSubmit () {
      this.$refs.editRolesFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('roles/' + this.editRolesForm.roleId, {
          roleName: this.editRolesForm.roleName,
          roleDesc: this.editRolesForm.roleDesc
        })
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getRolesList()
        this.editDialogVisible = false
      })
    },
    editDialogClosed () {
      this.$refs.editRolesFormRef.resetFields()
    },
    async deleteRight (row, id) {
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('用户取消操作')
      const { data: res } = await this.$http.delete(`roles/${row.id}/rights/${id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      // this.getRolesList()
      row.children = res.data
    },
    async showEditRightsDialog (row) {
      // console.log(id)
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // console.log(res)
      this.roleId = row.id
      this.getDefKeys(row, this.defKeys)
      // console.log(this.defKeys)
      this.rightslist = res.data
      this.RightsDialogVisible = true
    },
    RightsDialogClosed () {
      this.defKeys = []
    },
    getDefKeys (node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getDefKeys(item, arr))
    },
    async editRightsSubmit () {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const keyStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, {
        rids: keyStr
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getRolesList()
      this.RightsDialogVisible = false
    }
  },
  created () {
    this.getRolesList()
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 15px 5px;
}
.Row1 {
  // padding: 10px;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
}
.Col1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.Row1:last-child {
  border-bottom: 1px solid #ddd;
}
.Row2 {
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  // padding: 10px;
}
.Row2:last-child {
  border-bottom: 0;
}
</style>
