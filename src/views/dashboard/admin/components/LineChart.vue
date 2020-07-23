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
    }
    // chartData: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
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
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: '本周工单统计',
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['运维', '产品研发', '测试', 'UI设计', '前端']
        },
        grid: {
          left: '10',
          right: '10',
          bottom: '20',
          top: '50',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '运维',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 4, 7]
          },
          {
            name: '产品研发',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 8, 3]
          },
          {
            name: '测试',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 4, 2]
          },
          {
            name: 'UI设计',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 1, 7]
          },
          {
            name: '前端',
            type: 'line',
            stack: '总量',
            data: [150, 376, 256, 289, 179, 5, 12]
          }
        ]
      })
    }
  }
}
</script>
