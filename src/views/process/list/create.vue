<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="text item">
        <el-steps :active="active" finish-status="success">
          <template v-for="(item, index) in processStructure.nodes">
            <el-step
              v-if="item.isHideNode === false ||
                item.isHideNode === undefined ||
                item.isHideNode == null"
              :key="index"
              :title="item.label"
            />
          </template>
        </el-steps>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 15px">
      <div slot="header" class="clearfix">
        <span>公共信息</span>
      </div>
      <div class="text item">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="标题" prop="title" style="margin-bottom: 0">
            <el-input v-model="ruleForm.title" size="small" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 15px">
      <div slot="header" class="clearfix">
        <span>表单信息</span>
      </div>
      <div class="text item">
        <k-form-build
          v-for="(tplItem, tplIndex) in processStructure.tpls"
          :key="tplIndex"
          :ref="'kfd-' + tplItem.id"
          :value="JSON.parse(tplItem.form_structure)"
        />
      </div>
      <hr style="background-color: #d9d9d9; border:0; height:1px;">
      <div class="text item" style="text-align: center;margin-top:18px">
        <el-button
          v-for="(item, index) in processStructure.edges"
          v-show="item.source===processStructure.nodes[active].id"
          :key="index"
          type="primary"
          @click="submitAction(item.target)"
        >
          {{ item.label }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  processStructure,
  createWorkOrder
} from '@/api/process/work-order'
export default {
  name: 'Create',
  data() {
    return {
      active: 0,
      processStructure: {},
      ruleForm: {
        title: '',
        process: '',
        classify: '',
        state: [],
        source: '',
        source_state: '',
        process_method: '',
        tpls: {
          'form_structure': [],
          'form_data': []
        },
        tasks: []
      },
      rules: {
        title: [
          { required: true, message: '请输入工单标题', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getProcessNodeList()
  },
  methods: {
    getProcessNodeList() {
      processStructure({
        processId: this.$route.query.processId
      }).then(response => {
        this.processStructure = response.data
      })
    },
    submitAction(target) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          var stateMap = {}
          this.ruleForm.process = parseInt(this.$route.query.processId)
          this.ruleForm.classify = this.processStructure.process.classify
          stateMap['id'] = target
          this.ruleForm.source_state = this.processStructure.nodes[this.active].label
          for (var v of this.processStructure.nodes) {
            if (v.id === target) {
              if (v.assignType !== undefined) {
                stateMap['process_method'] = v.assignType
              }
              if (v.assignValue !== undefined) {
                stateMap['processor'] = Array.from(new Set(v.assignValue))
              }
              stateMap['label'] = v.label
              break
            }
          }
          this.ruleForm.state = [stateMap]

          this.ruleForm.tpls = {
            'form_structure': [],
            'form_data': []
          }
          // 绑定流程任务
          this.ruleForm.tasks = this.processStructure.process.tasks === undefined ? [] : this.processStructure.process.tasks
          // 追加节点任务
          if (this.processStructure.nodes[this.active].task !== undefined && this.processStructure.nodes[this.active].task.length > 0) {
            for (var task of this.processStructure.nodes[this.active].task) {
              if (this.ruleForm.tasks.indexOf(task) === -1) {
                this.ruleForm.tasks.push(task)
              }
            }
          }

          var promiseList = []
          for (var tpl of this.processStructure.tpls) {
            this.ruleForm.tpls.form_structure.push(tpl.form_structure)
            promiseList.push(this.$refs['kfd-' + tpl.id][0].getData())
          }
          Promise.all(promiseList).then(values => {
            this.ruleForm.source = this.processStructure.nodes[this.active].id
            this.ruleForm.tpls.form_data = values
            createWorkOrder(this.ruleForm).then(response => {
              if (response.code === 100000) {
                this.$router.push({ name: 'my-order' })
              }
            })
          })
        }
      })
    }
  }
}
</script>
