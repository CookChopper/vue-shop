<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="
注意：只允许为第三级分类设置相关参数！"
                type="warning"
                effect="dark"
                show-icon>
      </el-alert>
      <el-row style="margin:10px 0">
        <el-col>选择商品分类：
          <el-cascader v-model="CateKeys"
                       :options="catelist"
                       :props="CateProps"
                       @change="handleChange"
                       clearable></el-cascader>
        </el-col>
      </el-row>
      <el-tabs type="border-card"
               v-model="activeName"
               @tab-click="tabClick">
        <el-tab-pane label="动态参数"
                     name="many">
          <el-row style="margin-bottom:10px">
            <el-button type="primary"
                       size="mini"
                       :disabled="isBtnDisabled"
                       @click="addDialogVisible = true">添加参数</el-button>
          </el-row>
          <el-table :data="manyTableList"
                    border
                    swiper
                    style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag :key="i"
                        v-for="(item,i) in scope.row.attr_vals"
                        closable
                        @close="handleClose(i,scope.row)">
                  {{item}}
                </el-tag>
                <el-input class="input-new-tag"
                          v-if="scope.row.inputVisible"
                          v-model="scope.row.inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm(scope.row)"
                          @blur="handleInputConfirm(scope.row)">
                </el-input>
                <el-button v-else
                           class="button-new-tag"
                           size="small"
                           @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"
                             label="#"></el-table-column>
            <el-table-column prop="attr_name"
                             label="参数名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary"
                           class="el-icon-edit"
                           size="mini"
                           @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger"
                           class="el-icon-delete"
                           size="mini"
                           @click="deleteParmas(scope.row.attr_id)">删除</el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性"
                     name="only">
          <el-row style="margin-bottom:10px">
            <el-button type="primary"
                       size="mini"
                       :disabled="isBtnDisabled"
                       @click="addDialogVisible = true">添加参数</el-button>
          </el-row>
          <el-table :data="onlyTableList"
                    border
                    swiper
                    style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag :key="i"
                        v-for="(item,i) in scope.row.attr_vals"
                        closable
                        @close="handleClose(i,scope.row)">
                  {{item}}
                </el-tag>
                <el-input class="input-new-tag"
                          v-if="scope.row.inputVisible"
                          v-model="scope.row.inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm(scope.row)"
                          @blur="handleInputConfirm(scope.row)">
                </el-input>
                <el-button v-else
                           class="button-new-tag"
                           size="small"
                           @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"
                             label="#"></el-table-column>
            <el-table-column prop="attr_name"
                             label="参数名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary"
                           class="el-icon-edit"
                           size="mini"
                           @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger"
                           class="el-icon-delete"
                           size="mini"
                           @click="deleteParmas(scope.row.attr_id)">删除</el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :title="'添加' + titleText"
               :visible.sync="addDialogVisible"
               width="50%">
      <el-form :model="addForm"
               :rules="addFormRule"
               ref="addFormRef"
               label-width="100px">
        <el-form-item :label="titleText"
                      prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addFormSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="'修改' + titleText"
               :visible.sync="editDialogVisible"
               width="50%">
      <el-form :model="editForm"
               :rules="editFormRule"
               ref="editFormRef"
               label-width="100px">
        <el-form-item :label="titleText"
                      prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editFormSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      catelist: [],
      CateProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      CateKeys: [],
      CateId: '',
      activeName: 'many',
      manyTableList: [],
      onlyTableList: [],
      addDialogVisible: false,
      addForm: {
        attr_name: ''
      },
      addFormRule: {
        attr_name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }]
      },
      editDialogVisible: false,
      editForm: {},
      editFormRule: {
        attr_name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取商品分类
    async getCateList () {
      const { data: res } = await this.$http.get('categories', {
        params: {
          type: 3
        }
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.catelist = res.data
    },
    // 监听级联选择器
    async handleChange () {
      if (this.CateKeys.length !== 3) {
        this.CateKeys = []
        this.manyTableList = []
        this.onlyTableList = []
        return this.$message.warning('只允许为三级分类设置参数!')
      }
      this.CateId = this.CateKeys[2]
      this.getParamsList()
    },
    // 获取参数列表
    async getParamsList () {
      const { data: res } = await this.$http.get(`categories/${this.CateId}/attributes`, {
        params: {
          sel: this.activeName
        }
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      res.data.forEach(item => {
        item.inputVisible = false
        item.inputValue = ''
        item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
      })
      if (this.activeName === 'many') {
        this.manyTableList = res.data
      } else {
        this.onlyTableList = res.data
      }
      // console.log(this.manyTableList)
    },
    tabClick () {
      this.getParamsList()
    },
    handleClose (i, row) {
      row.attr_vals.splice(i, 1)
      this.saveAttr(row)
    },
    async saveAttr (row) {
      const { data: res } = await this.$http.put(`categories/${this.CateId}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: Array.isArray(row.attr_vals) ? row.attr_vals.join(',') : ''
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
    },
    showInput (row) {
      row.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm (row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      row.attr_vals.push(row.inputValue)
      row.inputValue = ''
      row.inputVisible = false
      this.saveAttr(row)
    },
    addFormSubmit () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(`categories/${this.CateId}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getParamsList()
        this.addDialogVisible = false
      })
    },
    async showEditDialog (id) {
      const { data: res } = await this.$http.get(`categories/${this.CateId}/attributes/${id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editFormSubmit () {
      this.$refs.editFormRef.validate(async valid => {
        console.log(this.editForm)
        if (!valid) return
        const { data: res } = await this.$http.put(`categories/${this.CateId}/attributes/${this.editForm.attr_id}`, {
          attr_name: this.editForm.attr_name,
          attr_sel: this.editForm.attr_sel,
          attr_vals: this.editForm.attr_vals
        })
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getParamsList()
        this.editDialogVisible = false
      })
    },
    async deleteParmas (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('用户取消操作')
      }
      const { data: res } = await this.$http.delete(`categories/${this.CateId}/attributes/${id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getParamsList()
    }
  },
  created () {
    this.getCateList()
  },
  computed: {
    isBtnDisabled () {
      if (this.CateKeys.length !== 3) {
        return true
      }
      return false
    },
    titleText () {
      if (this.activeName === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-cascader-menu {
  height: 300px;
}
.el-tag {
  margin: 5px;
}
.input-new-tag {
  width: 100px;
}
</style>
