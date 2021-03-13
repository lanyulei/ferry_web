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

    <el-card :bordered="false" :body-style="{padding: '0'}" :style="{ marginBottom: '12px' }">
      <div class="salesCard">
        <div>
          <h4 :style="{ marginBottom: '20px' }" style="margin-left: 20px;">提交工单统计</h4>
          <RangeSubmit :statistics-data="dashboardValue.submit" />
        </div>
      </div>
    </el-card>

    <el-row>
      <el-col :span="8">
        <el-card :bordered="false" :body-style="{padding: '0'}">
          <div class="salesCard leaderboard">
            <rank-list title="热门流程排行榜 Top 10" :list="dashboardValue.ranks" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="padding-left: 12px;">
        <el-card :bordered="false" :body-style="{padding: '0'}">
          <div class="salesCard leaderboard">
            <HandleRank title="处理工单人员排行榜" :list="dashboardValue.handle" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="padding-left: 12px;">
        <el-card :bordered="false" :body-style="{padding: '0'}">
          <div class="salesCard leaderboard">
            <HandlePeriod title="工单处理耗时排行榜" :list="dashboardValue.period" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartCard from './components/ChartCard'
import RankList from './components/RankList/index'
import RangeSubmit from './components/RangeSubmit'
import HandleRank from './components/HandleRank'
import HandlePeriod from './components/HandlePeriod'

import { initData } from '@/api/dashboard'

export default {
  name: 'DashboardAdmin',
  components: {
    ChartCard,
    RankList,
    RangeSubmit,
    HandleRank,
    HandlePeriod
  },
  data() {
    return {
      dashboardValue: {
        count: {}
      },
      rankList: [],
      submitData: []
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

.leaderboard {
  height: 448px;
  overflow: auto;
}
</style>
