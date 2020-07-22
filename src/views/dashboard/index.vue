<template>
  <div class="dashboard-container">
    <adminDashboard v-if="dashboardStatus" :panel-group="panelGroup" />
  </div>
</template>

<script>
import adminDashboard from './admin'
import { initData } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
      dashboardStatus: false
    }
  },
  created() {
    initData().then(response => {
      this.panelGroup = response.data
      console.log(this.panelGroup)
      this.dashboardStatus = true
    })
  }
}
</script>
