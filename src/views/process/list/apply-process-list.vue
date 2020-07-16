<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form-item label="分类名称">
          <el-input
            v-model="listQuery.name"
            placeholder="请输入分类名称"
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

      <div v-for="item in processLists" :key="item.id">
        <div v-if="item.process_list.length!==0">
          <div class="workflow-classify-title">{{ item.name }}</div>
          <div style="margin-bottom: 15px;">
            <el-button
              v-for="buttonItem in item.process_list"
              :key="buttonItem.id"
              class="workflow-classify-button"
              type="primary"
              plain
              @click="submitWorkOrder(buttonItem.id)"
            >
              {{ buttonItem.name }}
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { classifyProcessList } from '@/api/process/admin/process'

export default {
  name: 'ApplyProcessList',
  data() {
    return {
      processLists: [],
      listQuery: {}
    }
  },
  created() {
    this.getProcessList()
  },
  methods: {
    getProcessList() {
      classifyProcessList(this.listQuery).then(response => {
        this.processLists = response.data
      })
    },
    handleQuery() {
      console.log(this.listQuery)
      this.getProcessList()
    },
    submitWorkOrder(processId) {
      this.$router.push({ path: '/process/create-ticket', query: { processId: processId }})
    }
  }
}
</script>

<style scoped>
  .workflow-classify-title {
    border-bottom: 1px solid #dddddd;
    padding-bottom: 5px;
  }

  .workflow-classify-button {
    margin-left: 0;
    margin-right: 12px;
    margin-top: 12px;
  }
</style>
