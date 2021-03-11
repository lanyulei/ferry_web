<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="12">
      <el-col :sm="24" :xs="24" :md="6" :xl="6" :lg="6" :style="{ marginBottom: '12px' }">
        <chart-card title="工单总数" :total="dashboardValue.count.all">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="6" :xl="6" :lg="6" :style="{ marginBottom: '12px' }">
        <chart-card title="我创建的" :total="dashboardValue.count.my_create">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="6" :xl="6" :lg="6" :style="{ marginBottom: '12px' }">
        <chart-card title="我相关的" :total="dashboardValue.count.related">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="6" :xl="6" :lg="6" :style="{ marginBottom: '12px' }">
        <chart-card title="我的待办" :total="dashboardValue.count.upcoming">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
        </chart-card>
      </el-col>
    </el-row>

    <el-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <el-row>
          <el-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
            <div>
              <h4 :style="{ marginBottom: '20px' }" style="margin-left: 20px;">提交工单统计</h4>
              <v-chart :force-fit="true" :height="400" :data="ticketCountData" :scale="[{ dataKey: 'month', min: 0, max: 1 }]">
                <v-tooltip />
                <v-axis />
                <v-legend />
                <v-line position="month*temperature" color="city" />
                <v-point position="month*temperature" color="city" :size="4" :v-style="{ stroke: '#fff', lineWidth: 1 }" :shape="'circle'" />
              </v-chart>
            </div>
          </el-col>
          <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
            <rank-list title="提交工单排名" :list="dashboardValue.ranks" />
          </el-col>
        </el-row>
      </div>
    </el-card>

  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

import ChartCard from './components/ChartCard'
import RankList from './components/RankList/index'

import { initData } from '@/api/dashboard'

export default {
  name: 'DashboardAdmin',
  components: {
    ChartCard,
    RankList
  },
  data() {
    return {
      dashboardValue: {
        count: {}
      },
      rankList: [],
      ticketCountData: []
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    getInitData() {
      initData().then(response => {
        this.dashboardValue = response.data
      })

      const sourceData = [
        { month: 'Jan', Tokyo: 7.0, London: 3.9 },
        { month: 'Feb', Tokyo: 6.9, London: 4.2 },
        { month: 'Mar', Tokyo: 9.5, London: 5.7 },
        { month: 'Apr', Tokyo: 14.5, London: 8.5 },
        { month: 'May', Tokyo: 18.4, London: 11.9 },
        { month: 'Jun', Tokyo: 21.5, London: 15.2 },
        { month: 'Jul', Tokyo: 25.2, London: 17.0 },
        { month: 'Aug', Tokyo: 26.5, London: 16.6 },
        { month: 'Sep', Tokyo: 23.3, London: 14.2 },
        { month: 'Oct', Tokyo: 18.3, London: 10.3 },
        { month: 'Nov', Tokyo: 13.9, London: 6.6 },
        { month: 'Dec', Tokyo: 9.6, London: 4.8 }
      ]

      const dv = new DataSet.View().source(sourceData)
      dv.transform({
        type: 'fold',
        fields: ['Tokyo', 'London'],
        key: 'city',
        value: 'temperature'
      })
      this.ticketCountData = dv.rows
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 12px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

/deep/ .el-tabs__item{
   padding-left: 16px!important;
   height: 50px;
   line-height: 50px;
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
