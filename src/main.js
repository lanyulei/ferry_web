import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/admin.scss'

import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import { parseTime, resetForm, addDateRange, selectDictLabel } from '@/utils/costum'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import Pagination from '@/components/Pagination'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

// 代码编辑器
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror)

// 富文本编辑器
import VueEditor from 'vue2-editor'
Vue.use(VueEditor)

import iconPicker from 'e-icon-picker'
import 'e-icon-picker/dist/index.css'// 基础样式
import 'e-icon-picker/dist/main.css' // fontAwesome 图标库样式
Vue.use(iconPicker)

// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}

Vue.use(permission)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
