<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary"
                     @click="showAddDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table :data="catelist"
                  :columns="columns"
                  show-index
                  :selectable="false"
                  tree-type
                  :expand-type="false"
                  border
                  style="margin-top:10px">
        <template slot="isOk"
                  slot-scope="scope">
          <i class="el-icon-success"
             style="color:lightgreen"
             v-if="!scope.row.cat_deleted"></i>
          <i class="el-icon-error"
             style="color:red"
             v-else></i>
        </template>
        <template slot="order"
                  slot-scope="scope">
          <el-tag type="primary"
                  v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success"
                  v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning"
                  v-else>三级</el-tag>
        </template>
        <template slot="opt"
                  slot-scope="scope">
          <el-button class="el-icon-edit"
                     type="primary"
                     size="mini"
                     @click="showEditDialog(scope.row.cat_id)">编辑</el-button>
          <el-button class="el-icon-delete"
                     type="danger"
                     size="mini"
                     @click="deleteCate(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[2,5,10,20]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加分类"
               :visible.sync="addDialogVisible"
               width="50%"
               @close="addDialogClosed">
      <el-form :model="addForm"
               :rules="addFormRules"
               ref="addFormRef"
               label-width="100px">
        <el-form-item prop="cat_name"
                      label="分类名称">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader v-model="selectedVal"
                       :options="cateopt"
                       :props="cateProps"
                       @change="handleChange"
                       ref="cascaderRef"></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑分类"
               :visible.sync="editDialogVisible"
               width="50%"
               @close="editDialogClosed">
      <el-form :model="editForm"
               :rules="editFormRules"
               ref="editFormRef"
               label-width="100px">
        <el-form-item prop="cat_name"
                      label="分类名称">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      catelist: [],
      columns: [
        {
          title: '分类名称',
          key: 'cat_name'
        },
        {
          title: '是否有效',
          type: 'template',
          template: 'isOk'
        },
        {
          title: '排序',
          type: 'template',
          template: 'order'
        },
        {
          title: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        cat_name: '', cat_level: ''
      },
      addFormRules: {
        cat_name: [
          { required: true, message: '这是必填项', trigger: 'blur' }
        ]
      },
      editForm: {
      },
      editFormRules: {
        cat_name: [
          { required: true, message: '这是必填项', trigger: 'blur' }
        ]
      },
      cateopt: [],
      selectedVal: '',
      CateId: '',
      cateProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.catelist = res.data.result
      this.total = res.data.total
      // console.log(res.data)
      if (this.catelist.length === 0) {
        this.queryInfo.pagenum--
        this.getCateList()
      }
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    handleCurrentChange (newNum) {
      this.queryInfo.pagenum = newNum
      this.getCateList()
    },
    async showAddDialog () {
      const { data: res } = await this.$http.get('categories', {
        params: {
          type: 3
        }
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.cateopt = res.data
      console.log(res.data)
      this.addDialogVisible = true
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    handleChange () {
      // console.log(this.selectedVal)
      if (this.selectedVal.length !== 0) {
        this.CateId = this.selectedVal[this.selectedVal.length - 1]
        this.addForm.cat_level = this.selectedVal.length - 1
      } else {
        this.CateId = 0
        this.addForm.cat_level = 0
      }
    },
    addDialogSubmit () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', {
          cat_pid: this.CateId, ...this.addForm
        })
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getCateList()
        this.addDialogVisible = false
      })
    },
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('categories/' + id)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editDialogSubmit () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('categories/' + this.editForm.cat_id, {
          cat_name: this.editForm.cat_name
        })
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getCateList()
        this.editDialogVisible = false
      })
    },
    async deleteCate (id) {
      const confirmRes = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmRes !== 'confirm') return this.$http.info('用户取消操作')
      const { data: res } = await this.$http.delete('categories/' + id)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getCateList()
    }
  },
  watch: {
    selectedVal () {
      this.$refs.cascaderRef.toggleDropDownVisible()
    }
  }
}
</script>
<style lang="less" scoped>
.el-cascader-menu {
  height: 300px !important;
}
</style>
