<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="listQuery" :model="listQuery" :inline="true">
        <el-form ref="listQuery" :model="listQuery" :inline="true">
          <WorkOrderSearch :genre="'my-create'" @handleSearch="handleSearch" />
        </el-form>
      </el-form>

      <el-table v-loading="loading" border :data="ticketList" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="ID" prop="id" width="120" />
        <el-table-column label="标题" prop="title" :show-overflow-tooltip="true" />
        <el-table-column label="流程" prop="process_name" :show-overflow-tooltip="true" />
        <el-table-column label="当前状态" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>
              {{ scope.row.state_name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="当前处理人" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.is_end===0">{{ scope.row.principals }}</span>
          </template>
        </el-table-column>
        <el-table-column label="优先级" :show-overflow-tooltip="true" width="120" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.priority===2">
              <el-tag type="warning">紧急</el-tag>
            </span>
            <span v-else-if="scope.row.priority===3">
              <el-tag type="danger">非常紧急</el-tag>
            </span>
            <span v-else>
              <el-tag type="success">一般</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="是否结束" :show-overflow-tooltip="true" width="80" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_end===0" size="mini" type="success">否</el-tag>
            <el-tag v-else size="mini" type="danger">是</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="create_time" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
          <template slot-scope="scope">
            <el-button
              v-permisaction="['process:list:myCreate:select']"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleView(scope.row)"
            >查看</el-button>
            <el-button
              v-permisaction="['process:list:myCreate:reopen']"
              size="mini"
              type="text"
              icon="el-icon-refresh-right"
              @click="handleReopen(scope.row.id)"
            >重开</el-button>
            <el-button
              v-if="scope.row.is_end===0"
              v-permisaction="['process:list:upcoming:urge']"
              size="mini"
              type="text"
              icon="el-icon-alarm-clock"
              @click="handleUrge(scope.row)"
            >催办</el-button>
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
    </el-card>
  </div>
</template>

<script>
import { workOrderList, urgeWorkOrder, reopenWorkOrder } from '@/api/process/work-order'

// 搜索
import WorkOrderSearch from './components/search/index'
export default {
  components: { WorkOrderSearch },
  data() {
    return {
      users: [],
      nodeList: [],
      queryParams: {},
      total: 0,
      loading: false,
      ticketList: [],
      listQuery: {
        page: 1,
        per_page: 10
      },
      ruleForm: {
        work_order_id: '',
        node_id: '',
        user_id: '',
        remarks: ''
      },
      rules: {
        node_id: [
          { required: true, message: '请选择节点', trigger: 'change' }
        ],
        user_id: [
          { required: true, message: '请选择用户', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.listQuery.page = this.queryParams.pageIndex
      this.listQuery.per_page = this.queryParams.pageSize
      this.listQuery.classify = 2
      workOrderList(this.listQuery).then(response => {
        this.ticketList = response.data.data
        this.queryParams.pageIndex = response.data.page
        this.queryParams.pageSize = response.data.per_page
        this.total = response.data.total_count
        this.loading = false
      })
    },
    handleSearch(val) {
      for (var k in val) {
        this.listQuery[k] = val[k]
      }
      this.getList()
    },
    handleView(row) {
      this.$router.push({ name: 'ProcessListHandle', query: { workOrderId: row.id, processId: row.process }})
    },
    handleReopen(id) {
      this.$confirm('根据此工单新建一个新的工单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        reopenWorkOrder(id).then(res => {
          this.getList()
          this.$message({
            type: 'success',
            message: '成功!'
          })
        })
      })
    },
    handleSelectionChange() {},
    handleUrge(row) {
      this.$confirm('<span style="font-size:15px ">对此工单处理人进行催办通知提醒, 是否继续?</span><br><span style="color: #c33; font-size: 10px">注意：十分钟内只能催办一次。</span>', '催办', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        urgeWorkOrder({
          workOrderId: row.id
        }).then(response => {
          this.$message({
            type: 'success',
            message: '已进行催办通知!'
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

<style scoped>

</style>
