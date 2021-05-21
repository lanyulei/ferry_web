<template>
  <div class="app-container">
    <el-card class="box-card remove-padding-bottom">
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

      <div v-for="item in processLists" :key="item.id">
        <div v-if="item.process_list.length!==0">
          <div class="workflow-classify-title">
            {{ item.name }}
          </div>
          <div style="margin-bottom: 15px;">
            <template v-for="(buttonItem, buttonIndex) in item.process_list">
              <el-tooltip :key="buttonItem.id" effect="dark" placement="top">
                <div slot="content">
                  {{ buttonItem.name }}
                  <br>
                  {{ buttonItem.remarks }}
                </div>
                <div
                  class="workflow-classify-div"
                  :style="(buttonIndex + 1) % 5 === 0 ? {'padding-right': 0} : {'padding-right': '12px'}"
                >
                  <el-button
                    style="width: 100%"
                    plain
                    @click="submitWorkOrder(buttonItem.id)"
                  >
                    <div class="process-button-div">
                      <div class="process-div-icon">
                        <e-icon class="process-div-el-icon" :icon-name="buttonItem.icon" />
                      </div>
                      <div class="process-div-body">
                        <div class="process-div-title ellipsis">
                          {{ buttonItem.name }}
                        </div>
                        <div class="process-div-remarks ellipsis">
                          {{ buttonItem.remarks }}
                        </div>
                      </div>
                    </div>
                  </el-button>
                </div>
              </el-tooltip>
            </template>
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
    border-left: 3px solid rgb(64, 158, 255);
    padding-left: 5px;
  }

  .workflow-classify-div {
    width: 20%;
    display: inline-block;
    margin-left: 0;
    margin-top: 12px;
  }

  .el-card__body {
    padding-bottom: 0;
  }

  .process-button-div {
    width: 180px;
    height: 50px;
  }

  .process-div-icon {
    float: left;
    width: 50px;
    height: 100%;
    margin-right: 10px;
  }

  .process-div-el-icon {
    font-size: 32px;
    line-height: 50px;
    color: #606266;
  }

  .process-div-body {
    float: left;
    width: 120px;
    height: 100%;
    text-align: left;
  }

  .process-div-title {
    font-size: 15px;
    margin-top: 6px;
    color: #606266;
    height: 18px;
    line-height: 18px;
  }

  .process-div-remarks {
    color: #999999;
    margin-top: 6px;
    font-size: 12px;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
