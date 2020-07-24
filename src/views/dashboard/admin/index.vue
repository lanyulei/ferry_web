<template>
  <div class="dashboard-editor-container">
    <panel-group :panel-group-value="panelGroupValue" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <TicketSubmissionRanking />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <TodoWorkOrderRanking />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <ProcessingTicketRanking />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TicketSubmissionRanking from './components/TicketSubmissionRanking'
import TodoWorkOrderRanking from './components/TodoWorkOrderRanking'
import ProcessingTicketRanking from './components/ProcessingTicketRanking'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    TicketSubmissionRanking,
    TodoWorkOrderRanking,
    ProcessingTicketRanking
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['panelGroupValue'],
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
