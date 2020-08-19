import request from '@/utils/request'

// 设置系统配置信息
export function setSettings(data) {
  return request({
    url: '/api/v1/settings',
    method: 'post',
    data
  })
}

// 获取系统配置信息
export function getSettings(params) {
  return request({
    url: '/api/v1/settings',
    method: 'get',
    params
  })
}
