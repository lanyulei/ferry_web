<template>
  <div class="dashboard-container">
    <adminDashboard v-if="dashboardStatus" :dashboard-value="dashboardValue" />
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
      this.dashboardValue = response.data
      this.dashboardStatus = true
    })
  }
}
</script>
