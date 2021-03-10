<template>
  <div class="dashboard-editor-container">
    <panel-group :panel-group-value="dashboardValue.panelGroup" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :statistics-data="dashboardValue.statisticsData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <TicketSubmissionRanking :submit-ranking-data="dashboardValue.submitRankingData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <processOrderList :process-order-list="dashboardValue.processOrderList" />
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <ProcessingTicketRanking />
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TicketSubmissionRanking from './components/TicketSubmissionRanking'
import processOrderList from './components/processOrderList'
// import TodoWorkOrderRanking from './components/TodoWorkOrderRanking'
// import ProcessingTicketRanking from './components/ProcessingTicketRanking'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    TicketSubmissionRanking,
    processOrderList
    // TodoWorkOrderRanking,
    // ProcessingTicketRanking
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['dashboardValue'],
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
