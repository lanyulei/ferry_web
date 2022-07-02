<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="任务名称">
          <el-input
            v-model="listQuery.name"
            placeholder="请输入任务名称"
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
            v-permisaction="['process:admin:task:add']"
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

      <el-table v-loading="loading" border :data="taskList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" />
        <el-table-column label="UUID" prop="uuid" />
        <el-table-column label="名称" prop="name" :show-overflow-tooltip="true" />
        <el-table-column label="任务类型" prop="classify" :show-overflow-tooltip="true" />
        <el-table-column label="创建者" prop="creator" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-permisaction="['process:admin:task:edit']"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              v-permisaction="['process:admin:task:delete']"
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

      <el-dialog
        :title="dialogFormVisibleName===1?'新建任务':'编辑任务'"
        :close-on-click-modal="false"
        :visible.sync="open"
      >
        <div class="tpl-create-content">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入任务名称" style="width: 50%" />
            </el-form-item>
            <el-form-item label="类型" prop="classify">
              <el-select v-model="ruleForm.classify" placeholder="请选择任务类型" style="width: 50%" @change="selectTaskType">
                <el-option label="Python" value="python" />
                <el-option label="Shell" value="shell" />
              </el-select>
            </el-form-item>
            <el-form-item label="任务" prop="content">
              <div class="codemirror-div">
                <codemirror
                  v-if="codemirrorRefresh"
                  ref="codemirror"
                  :value="ruleForm.content"
                  :options="contentOptions"
                  class="codemirror"
                />
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
import {
  createTask,
  taskList,
  taskDetails,
  updateTask,
  deleteTask
} from '@/api/process/admin/task'

// 代码编辑器
import { codemirror } from 'vue-codemirror'
require('codemirror/mode/python/python') // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
require('codemirror/mode/shell/shell') // 这里引入的模式的js，根据设置的mode引入，一定要引入！！

export default {
  name: 'Task',
  components: {
    codemirror
  },
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
      codemirrorRefresh: true,
      taskList: [],
      ruleForm: {
        name: '',
        classify: '',
        content: ''
      },
      contentOptions: {
        flattenSpans: false, // 默认情况下，CodeMirror会将使用相同class的两个span合并成一个。通过设置此项为false禁用此功能
        matchBrackets: true, // 匹配符号
        lineWiseCopyCut: true, // 如果在复制或剪切时没有选择文本，那么就会自动操作光标所在的整行
        tabSize: 4,
        value: '',
        mode: 'python',
        lineNumbers: true, // 显示行号
        line: true,
        smartIndent: true, // 智能缩进
        autoCloseBrackets: true, // 自动输入括弧
        foldGutter: true, // 允许在行号位置折叠
        indentUnit: 4, // 智能缩进单位为4个空格长度
        styleActiveLine: true // 激活当前行样式
      },
      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.match(/^[_a-zA-Z0-9]+$/)) {
                callback()
              } else {
                callback(new Error('只能输入大小写英文及下划线'))
              }
            },
            trigger: 'blur'
          }
        ],
        classify: [
          { required: true, message: '请选择任务类型', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入任务内容', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        per_page: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    selectTaskType() {
      if (this.ruleForm.classify === '') {
        this.contentOptions.mode = 'python'
      } else {
        this.contentOptions.mode = this.ruleForm.classify
      }
      this.codemirrorRefresh = false
      this.codemirrorRefresh = true
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true
      this.listQuery.page = this.queryParams.pageIndex
      this.listQuery.per_page = this.queryParams.pageSize
      taskList(this.listQuery).then(response => {
        this.taskList = response.data.data
        this.queryParams.pageIndex = response.data.page
        this.queryParams.pageSize = response.data.per_page
        this.total = response.data.total_count
        this.loading = false
      })
    },
    handleQuery(val) {
      this.listQuery.name = val.name
      this.getList()
    },
    handleCreate() {
      this.ruleForm = {
        name: '',
        classify: '',
        content: ''
      }
      this.dialogFormVisibleName = 1
      this.open = true
    },
    handleEdit(row) {
      this.dialogFormVisibleName = 2
      taskDetails({
        file_name: row.full_name
      }).then(response => {
        this.ruleForm = {
          name: row.name,
          full_name: row.full_name,
          classify: row.classify,
          content: response.data
        }
        this.open = true
      })
    },
    submitForm(formName) {
      this.ruleForm.content = this.$refs.codemirror.content
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createTask(this.ruleForm).then(() => {
            this.getList()
            this.open = false
            this.$message({
              message: '任务脚本创建成功',
              type: 'success'
            })
          })
        }
      })
    },
    editForm(formName) {
      this.ruleForm.content = this.$refs.codemirror.content
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateTask(this.ruleForm).then(response => {
            this.getList()
            this.open = false
            this.$message({
              message: '任务脚本更新成功',
              type: 'success'
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTask({
          full_name: row.full_name
        }).then(() => {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange() {}
  }
}
</script>

<style scoped>
  .codemirror {
    line-height: 150%;
  }

  .codemirror-div {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    overflow: hidden;
  }
</style>
