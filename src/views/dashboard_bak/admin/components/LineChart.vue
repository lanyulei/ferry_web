<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    statisticsData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    statisticsData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.statisticsData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: '最近7天工单统计',
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['工单总数', '待办工单', '已完成工单']
        },
        grid: {
          left: '25',
          right: '45',
          bottom: '20',
          top: '50',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.statisticsData.datetime
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '工单总数',
            type: 'line',
            data: this.statisticsData.total
          },
          {
            name: '待办工单',
            type: 'line',
            data: this.statisticsData.processing
          },
          {
            name: '已完成工单',
            type: 'line',
            data: this.statisticsData.overs
          }
        ]
      })
    }
  }
}
</script>
