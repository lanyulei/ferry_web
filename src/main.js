import Vue from 'vue'
import VueI18n from 'vue-i18n'

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
import 'e-icon-picker/dist/main.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // fontAwesome 图标库样式
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
  i18n: (key, value) => i18n.t(key, value),
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

const messages = {
  'en-US': {
    header: {
      title: 'FormMaking',
      document: 'Docs',
      pricing: 'Pricing',
      advanced: 'Advanced'
    }
  },
  'zh-CN': {
    header: {
      title: '表单设计器',
      document: '使用文档',
      pricing: '商业授权',
      advanced: '高级版本'
    }
  }
}

const i18n = new VueI18n({
  messages: {
    'en-US': {
      ...enLocale, ...messages['en-US']
    },
    'zh-CN': {
      ...zhLocale, ...messages['zh-CN']
    }
  }
})

// import 'form-making/dist/FormMaking.css'
// import FormMaking from 'form-making'
import FormMaking from './components/VueFormMaking/index'
// Vue.use(FormMaking)
Vue.use(FormMaking, {
  i18n
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
