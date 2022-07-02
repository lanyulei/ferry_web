<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="流程名称">
          <el-input
            v-model="listQuery.name"
            placeholder="请输入流程名称"
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
            v-permisaction="['process:admin:manager:add']"
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

      <el-table v-loading="loading" border :data="processValueList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" prop="id" width="120" />
        <el-table-column label="名称" prop="name" :show-overflow-tooltip="true" />
        <el-table-column label="创建者" prop="create_name" :show-overflow-tooltip="true" width="150" />
        <el-table-column label="创建时间" align="center" prop="create_time" width="180" />
        <el-table-column label="更新时间" align="center" prop="update_time" width="180" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-permisaction="['process:admin:manager:clone']"
              size="mini"
              type="text"
              icon="el-icon-receiving"
              @click="handleClone(scope.row)"
            >克隆</el-button>
            <el-button
              v-permisaction="['process:admin:manager:edit']"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              v-permisaction="['process:admin:manager:delete']"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
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

      <el-dialog :title="dialogProcessVisibleName===1?'新建流程':'编辑流程'" :visible.sync="open" :fullscreen="true" style="margin-top: 0">
        <div class="tpl-create-content">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入流程名称" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="图标" prop="icon">
                  <e-icon-picker v-model="ruleForm.icon" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="分类" prop="classify">
                  <el-select v-model="ruleForm.classify" filterable placeholder="请选择流程分类" style="width: 100%">
                    <el-option
                      v-for="item in classifyListData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="模版" prop="tpls">
                  <el-select v-model="ruleForm.tpls" filterable multiple placeholder="请选择模版" style="width: 100%">
                    <el-option
                      v-for="item in templates"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="通知">
                  <el-select v-model="ruleForm.notice" multiple filterable clearable placeholder="请选择流程任务" style="width: 100%">
                    <el-option label="邮件" :value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务">
                  <el-select v-model="ruleForm.task" multiple filterable clearable placeholder="请选择流程任务" style="width: 100%">
                    <el-option
                      v-for="(item, index) in taskListData"
                      :key="index"
                      :label="item.name"
                      :value="item.full_name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="描述" prop="remarks">
              <el-input
                v-model="ruleForm.remarks"
                placeholder="请输入流程描述"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="流程" prop="structure">
              <div style="border-radius: 4px; overflow:hidden">
                <div>
                  <WfdDesign
                    v-if="wfdDesignRefresh"
                    ref="wfd"
                    :users="users"
                    :roles="roles"
                    :departments="departments"
                    :tasks="taskListData"
                    :templates="ruleForm.tpls"
                    :templates-base="templates"
                    :data="ruleForm.structure"
                    :height="600"
                    :lang="lang"
                  />
                </div>
              </div>
            </el-form-item>
          </el-form>
          <div style="text-align: center; margin-top: 20px">
            <el-button type="primary" @click="dialogProcessVisibleName===1?submitForm('ruleForm'):editForm('ruleForm')">提交</el-button>
            <el-button @click="open = false">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  processList,
  createProcess,
  updateProcess,
  processDetails,
  deleteProcess,
  cloneProcess
} from '@/api/process/admin/process'

import { classifyList } from '@/api/process/admin/classify'
import { templateList } from '@/api/process/admin/template'
import { taskList } from '@/api/process/admin/task'
import { listUser } from '@/api/system/sysuser'
import { listRole } from '@/api/system/role'
import { getOrdinaryDeptList } from '@/api/system/dept'

export default {
  name: 'Process',
  components: {
    WfdDesign: () => import('@/components/wfd/components/Wfd')
  },
  data() {
    return {
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
      structureValue: [],
      users: [],
      roles: [],
      groups: [],
      departments: [],
      templates: [],
      taskListData: [],
      wfdDesignRefresh: true,
      classifyListData: [],
      dialogProcessVisibleName: 1,
      processValueList: [],
      listQuery: {
        page: 1,
        per_page: 10
      },
      lang: 'zh',
      ruleForm: {},
      rules: {
        icon: [
          { required: true, message: '请输入流程图标', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入流程名称', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请选择流程分类', trigger: 'blur, change' }
        ],
        tpls: [
          { required: true, message: '请选择模版', trigger: 'blur, change' }
        ],
        structure: [
          { required: true, message: '请设计流程', trigger: 'blur' }
        ],
        remarks: [
          { required: true, message: '请输入流程描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取任务列表
    getTaskList() {
      taskList({
        page: 1,
        per_page: 99999
      }).then(response => {
        this.taskListData = response.data.data
      })
    },
    // 获取流程分类列表
    getClassifyList() {
      classifyList({
        page: 1,
        per_page: 99999
      }).then(response => {
        this.classifyListData = response.data.data
      })
    },
    // 获取模版列表
    getTemplates() {
      templateList({
        page: 1,
        per_page: 99999
      }).then(response => {
        this.templates = response.data.data
      })
    },
    // 获取用户
    getUsers() {
      listUser({
        pageSize: 999999
      }).then(response => {
        this.users = response.data.list
      })
    },
    getRoles() {
      listRole({
        pageSize: 999999
      }).then(response => {
        this.roles = response.data.list
      })
    },
    // 获取部门
    getDepartments() {
      getOrdinaryDeptList().then(response => {
        this.departments = response.data
      })
    },
    /** 查询流程列表 */
    getList() {
      this.loading = true
      this.listQuery.page = this.queryParams.pageIndex
      this.listQuery.per_page = this.queryParams.pageSize
      processList(this.listQuery).then(response => {
        this.processValueList = response.data.data
        this.queryParams.pageIndex = response.data.page
        this.queryParams.pageSize = response.data.per_page
        this.total = response.data.total_count
        this.loading = false
      })
    },
    getProcessInitData() {
      this.getClassifyList()
      this.getTemplates()
      this.getUsers()
      this.getRoles()
      this.getDepartments()
      this.getTaskList()
    },
    handleCreate() {
      this.getProcessInitData()
      this.ruleForm = {
        id: undefined,
        name: '',
        tpls: [],
        structure: { 'edges': [], 'nodes': [], 'groups': [] },
        classify: '',
        task: [],
        notice: [1],
        icon: '',
        remarks: ''
      }
      this.dialogProcessVisibleName = 1
      this.open = true
      this.wfdDesignRefresh = false
      this.$nextTick(() => {
        this.wfdDesignRefresh = true
      })
    },
    handleEdit(row) {
      this.dialogProcessVisibleName = 2
      this.getProcessInitData()
      this.wfdDesignRefresh = false
      this.open = true
      processDetails({
        processId: row.id
      }).then(response => {
        this.ruleForm = {
          id: response.data.id,
          name: response.data.name,
          tpls: response.data.tpls,
          structure: response.data.structure,
          classify: response.data.classify,
          task: response.data.task,
          notice: response.data.notice,
          icon: response.data.icon,
          remarks: response.data.remarks
        }
        this.wfdDesignRefresh = false
        this.$nextTick(() => {
          this.wfdDesignRefresh = true
        })
      })
    },
    verifyProcess(structureValue) {
      for (var r of structureValue.nodes) {
        if (r.sort === undefined || r.sort === null || r.sort === '') {
          return '流程节点顺序不能为空'
        } else if (r.label === undefined || r.label === null || r.label === '') {
          return '流程节点标题不能为空'
        }
        if (r.clazz === 'userTask' || r.clazz === 'receiveTask') {
          if (r.assignType === undefined || r.assignType === null || r.assignType === '') {
            return '审批节点或处理节点的处理人类型不能为空'
          } else if (r.assignValue === undefined || r.assignValue === null || r.assignValue === '' || r.assignValue.length === 0) {
            return '审批节点或处理节点的处理人不能为空'
          }
        }
      }
      for (var e of structureValue.edges) {
        if (e.sort === undefined || e.sort === null || e.sort === '') {
          return '流转顺序不能为空'
        } else if (e.label === undefined || e.label === null || e.label === '') {
          return '流转标题不能为空'
        } else if (e.flowProperties === undefined || e.flowProperties === null || e.flowProperties === '') {
          return '流转属性不能为空'
        }
      }
      return ''
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var structureValue = this.$refs.wfd.graph.save()
          var r = this.verifyProcess(structureValue)
          if (r !== '') {
            this.$message.error(r)
            return
          }
          if (structureValue.nodes.length > 0 && structureValue.edges.length > 0) {
            this.ruleForm.structure = structureValue
            createProcess(this.ruleForm).then(response => {
              this.getList()
              this.open = false
            })
          } else {
            this.$message.error('没有流程数据，请完善流程')
          }
        }
      })
    },
    editForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var structureValue = this.$refs.wfd.graph.save()
          var r = this.verifyProcess(structureValue)
          if (r !== '') {
            this.$message.error(r)
            return
          }
          if (structureValue.nodes.length > 0 && structureValue.edges.length > 0) {
            updateProcess({
              id: this.ruleForm.id,
              name: this.ruleForm.name,
              tpls: this.ruleForm.tpls,
              structure: structureValue,
              classify: this.ruleForm.classify,
              task: this.ruleForm.task,
              notice: this.ruleForm.notice,
              icon: this.ruleForm.icon,
              remarks: this.ruleForm.remarks
            }).then(response => {
              this.getList()
              this.open = false
            })
          } else {
            this.$notify({
              title: '错误',
              message: '没有流程数据，请完善流程',
              type: 'error'
            })
          }
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
        deleteProcess({
          processId: row.id
        }).then(response => {
          if (response !== undefined) {
            this.getList()
            this.$message({
              type: 'success',
              message: '流程已删除!'
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
      this.$confirm(`确认克隆流程 < ${row.name} > ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        cloneProcess(row.id).then(() => {
          this.getList()
          this.$message({
            type: 'success',
            message: '流程已克隆!'
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
