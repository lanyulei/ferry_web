import request from '@/utils/request'

export function initData(params) {
  return request({
    url: '/api/v1/dashboard',
    method: 'get',
    params
  })
}
