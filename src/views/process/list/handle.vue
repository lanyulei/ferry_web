<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="text item">
        <el-steps :active="activeIndex" finish-status="success">
          <template v-for="(item, index) in nodeStepList">
            <el-step
              v-if="item.isHideNode === false ||
                item.isHideNode === undefined ||
                item.isHideNode == null ||
                item.id === processStructureValue.workOrder.current_state"
              :key="index"
              :title="item.label"
            />
          </template>
        </el-steps>
      </div>
    </el-card>

    <el-alert
      v-if="activeIndex !== nodeStepList.length && processStructureValue.workOrder.is_end===1"
      style="margin-top: 15px"
      :title="alertMessage"
      type="error"
      :closable="false"
    />

    <el-card class="box-card" style="margin-top: 15px">
      <div slot="header" class="clearfix">
        <span>公共信息</span>
      </div>
      <div class="text item">
        <el-form label-width="100px">
          <el-form-item label="标题:" style="margin-bottom: 5px">
            <span>{{ processStructureValue.workOrder.title }}</span>
          </el-form-item>
          <el-form-item label="优先级:" style="margin-bottom: 0">
            <span v-if="processStructureValue.workOrder.priority===2">
              <el-tag type="warning">紧急</el-tag>
            </span>
            <span v-else-if="processStructureValue.workOrder.priority===3">
              <el-tag type="danger">非常紧急</el-tag>
            </span>
            <span v-else>
              <el-tag type="success">正常</el-tag>
            </span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 15px">
      <div slot="header" class="clearfix">
        <span>表单信息</span>
      </div>
      <div class="text item">
        <fm-generate-form
          v-for="(tplItem, tplIndex) in processStructureValue.tpls"
          :key="tplIndex"
          :ref="'generateForm-'+tplItem.id"
          :remote="remoteFunc"
          :value="tplItem.form_data"
          :data="tplItem.form_structure"
          :disabled="true"
        />
      </div>
      <div v-if="processStructureValue.userAuthority">
        <hr style="background-color: #d9d9d9; border:0; height:1px;">
        <div class="text item" style="text-align: center;margin-top:18px">
          <template v-for="(item, index) in processStructureValue.edges">
            <el-button
              v-if="item.source===nodeStepList[activeIndex].id && processStructureValue.workOrder.is_end===0"
              :key="index"
              type="primary"
              @click="submitAction(item)"
            >
              {{ item.label }}
            </el-button>
          </template>
        </div>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 15px">
      <div slot="header" class="clearfix">
        <span>工单流转历史</span>
      </div>
      <div class="text item">
        <el-table
          :data="circulationHistoryList"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="state"
            label="节点"
          />
          <el-table-column
            prop="circulation"
            label="流转"
          />
          <el-table-column
            prop="processor"
            label="处理人"
          />
          <el-table-column
            prop="create_time"
            label="处理时间"
          />
          <el-table-column
            prop="remarks"
            label="备注"
          />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  GenerateForm
} from '@/components/VueFormMaking'
import 'form-making/dist/FormMaking.css'
Vue.component(GenerateForm.name, GenerateForm)

import {
  processStructure,
  handleWorkOrder
} from '@/api/process/work-order'

import { listUser } from '@/api/system/sysuser'
export default {
  data() {
    return {
      alertMessage: '',
      nodeStepList: [],
      circulationHistoryList: [],
      activeIndex: 0,
      processStructureValue: {
        workOrder: { title: '' }
      },
      ruleForm: {
        title: '',
        process: '',
        classify: '',
        state_id: '',
        state: '',
        source_state: '',
        processor: '',
        process_method: '',
        tpls: [],
        tasks: []
      },
      remoteFunc: {
        // 获取用户列表
        getUserListFunc(resolve) {
          listUser({
            pageSize: 999999
          }).then(response => {
            const options = response.data.list
            resolve(options)
          })
        }
      }
    }
  },
  created() {
    this.getProcessNodeList()
  },
  methods: {
    getProcessNodeList() {
      processStructure({
        processId: this.$route.query.processId,
        workOrderId: this.$route.query.workOrderId
      }).then(response => {
        this.processStructureValue = response.data
        this.circulationHistoryList = this.processStructureValue.circulationHistory

        // 获取当前展示节点列表
        for (var i = 0; i < this.processStructureValue.nodes.length; i++) {
          if (this.processStructureValue.nodes[i].id === this.processStructureValue.workOrder.current_state) {
            // 当前节点
            this.nodeStepList.push(this.processStructureValue.nodes[i])
            this.activeIndex = this.nodeStepList.length - 1
            if (i + 1 === this.processStructureValue.nodes.length) {
              this.activeIndex = this.nodeStepList.length
            }
          } else if (!this.processStructureValue.nodes[i].isHideNode) {
            // 非隐藏节点
            this.nodeStepList.push(this.processStructureValue.nodes[i])
          }
        }
        this.getAlertMessage()
      })
    },
    submitAction(item) {
      handleWorkOrder({
        tasks: this.processStructureValue.process.task,
        source_state: this.processStructureValue.workOrder.current_state,
        target_state: item.target,
        circulation: item.label,
        flow_properties: item.flowProperties === undefined ? 2 : parseInt(item.flowProperties),
        work_order_id: parseInt(this.$route.query.workOrderId)
      }).then(response => {
        if (response.code === 200) {
          // this.$router.push({ name: 'upcoming' })
          window.location.reload()
        }
      })
    },
    // 获取提示消息
    getAlertMessage() {
      if (this.processStructureValue.workOrder.is_end === 1) {
        this.alertMessage = '当前工单已结束。'
      }
    }
  }
}
</script>
