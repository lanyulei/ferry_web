<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="模版名称">
          <el-input
            v-model="listQuery.name"
            placeholder="请输入模版名称"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-permisaction="['process:admin:template:add']"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleCreate"
          >新增</el-button>
        </el-col>
        <!-- <el-col :span="1.5">
          <el-button
            v-permisaction="['system:sysrole:edit']"
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
          >编辑</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-permisaction="['system:sysrole:remove']"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
          >删除</el-button>
        </el-col> -->
      </el-row>

      <el-table v-loading="loading" border :data="tplList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" prop="id" width="120" />
        <el-table-column label="名称" prop="name" :show-overflow-tooltip="true" />
        <el-table-column label="创建者" prop="create_name" :show-overflow-tooltip="true" width="150" />
        <el-table-column label="创建时间" align="center" prop="create_time" width="180" />
        <el-table-column label="更新时间" align="center" prop="update_time" width="180" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="{row}">
            <el-button
              v-permisaction="['process:admin:template:clone']"
              size="mini"
              type="text"
              icon="el-icon-receiving"
              @click="handleClone(row)"
            >克隆</el-button>
            <el-button
              v-permisaction="['process:admin:template:edit']"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(row)"
            >编辑</el-button>
            <el-button
              v-permisaction="['process:admin:template:delete']"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageIndex"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />

      <el-dialog :title="dialogFormVisibleName===1?'新建模版':'编辑模版'" :visible.sync="open" :fullscreen="true" style="margin-top: 0">
        <div class="tpl-create-content">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="ruleForm.remarks" type="textarea" />
            </el-form-item>
            <el-form-item label="模版" prop="form_structure">
              <div style="border-radius: 4px; border: 1px solid #ccc; overflow:hidden">
                <fm-making-form
                  ref="makingform"
                  style="height: 600px;"
                  preview
                  clearable
                  upload
                  generate-code
                  generate-json
                  :advance-fields="['editor', 'imgupload', 'file', 'subform', 'cascader']"
                >
                  <template slot="action" />
                </fm-making-form>
              </div>
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <el-button type="primary" @click="dialogFormVisibleName===1?submitForm('ruleForm'):editForm('ruleForm')">提交</el-button>
            <el-button @click="open = false">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'

import {
  templateList,
  createTemplate,
  templateDetails,
  editTemplate,
  deleteTemplate,
  cloneTemplate
} from '@/api/process/admin/template'

// 表单设计
import {
  GenerateForm,
  MakingForm
} from '@/components/VueFormMaking'
import '@/components/VueFormMaking/styles/FormMaking.css'

import ace from 'ace-builds'
import 'ace-builds/webpack-resolver'
Vue.use(ace)
Vue.use(GenerateForm)
Vue.use(MakingForm)

export default {
  name: 'Template',
  data() {
    return {
      dialogFormVisibleName: 1,
      queryParams: {
        pageIndex: 1,
        pageSize: 10
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 是否显示弹出层
      open: false,
      // 查询参数
      tplList: [],
      listQuery: {
        page: 1,
        per_page: 10
      },
      ruleForm: {
        id: undefined,
        name: '',
        remarks: '',
        form_structure: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入模版名称', trigger: 'blur' }
        ],
        form_structure: [
          { required: true, message: '请设计模版', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询模版列表 */
    getList() {
      this.loading = true
      this.listQuery.page = this.queryParams.pageIndex
      this.listQuery.per_page = this.queryParams.pageSize
      templateList(this.listQuery).then(response => {
        this.tplList = response.data.data
        this.queryParams.pageIndex = response.data.page
        this.queryParams.pageSize = response.data.per_page
        this.total = response.data.total_count
        this.loading = false
      })
    },
    handleCreate() {
      this.ruleForm = {
        id: undefined,
        name: '',
        remarks: '',
        form_structure: ''
      }
      this.dialogFormVisibleName = 1
      this.open = true
      this.$nextTick(() => {
        this.$refs.makingform.handleClear()
      })
    },
    handleEdit(row) {
      this.dialogFormVisibleName = 2
      templateDetails({
        template_id: row.id
      }).then(response => {
        this.ruleForm = {
          id: response.data.id,
          name: response.data.name,
          remarks: response.data.remarks,
          form_structure: response.data.remarks
        }
        this.open = true
        this.$nextTick(() => {
          this.$refs.makingform.setJSON(response.data.form_structure)
        })
      })
    },
    submitForm(formName) {
      this.handleSave(this.$refs.makingform.getJSON())
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createTemplate(this.ruleForm).then(() => {
            this.getList()
            this.open = false
          })
        }
      })
    },
    editForm(formName) {
      this.handleSave(this.$refs.makingform.getJSON())
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editTemplate(this.ruleForm).then(() => {
            this.getList()
            this.open = false
          })
        }
      })
    },
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.queryParams.pageSize = 10
      this.getList()
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTemplate({
          templateId: row.id
        }).then(response => {
          if (response !== undefined) {
            this.getList()
            this.$message({
              type: 'success',
              message: '模版已删除!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange() {},
    handleSave(values) {
      if (values.list.length > 0) {
        this.ruleForm.form_structure = values
      } else {
        this.ruleForm.form_structure = ''
      }
    },
    handleClone(row) {
      this.$confirm(`确认克隆模版 < ${row.name} > ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        cloneTemplate(row.id).then(() => {
          this.getList()
          this.$message({
            type: 'success',
            message: '模版已克隆!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
