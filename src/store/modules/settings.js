import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import { getSettings } from '@/api/system/settings'

const { title, logo, isLdap, showSettings, tagsView, fixedHeader, sidebarLogo, isVerifyCode } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  title: title,
  logo: logo,
  isLdap: isLdap,
  isVerifyCode: isVerifyCode
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_SYSTEM_SETTING: (state, content) => {
    state.title = content.name
    state.logo = content.logo
    state.isLdap = content.is_ldap
    state.isVerifyCode = content.is_verify_code
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // get user info
  getSystemSettings({ commit }) {
    return new Promise((resolve) => {
      getSettings({
        classify: 1
      }).then(response => {
        commit('CHANGE_SYSTEM_SETTING', response.data[0].content)
        resolve(response)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

