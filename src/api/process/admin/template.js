import request from '@/utils/request'

// 创建模版
export function createTemplate(data) {
  return request({
    url: '/api/v1/tpl',
    method: 'post',
    data
  })
}

// 模版列表
export function templateList(params) {
  return request({
    url: '/api/v1/tpl',
    method: 'get',
    params
  })
}

// 模版详情
export function templateDetails(params) {
  return request({
    url: '/api/v1/tpl/details',
    method: 'get',
    params
  })
}

// 更新模版
export function editTemplate(data) {
  return request({
    url: '/api/v1/tpl',
    method: 'put',
    data
  })
}

// 删除模版
export function deleteTemplate(params) {
  return request({
    url: '/api/v1/tpl',
    method: 'delete',
    params
  })
}

// 克隆模版
export function cloneTemplate(id) {
  return request({
    url: `/api/v1/tpl/clone/${id}`,
    method: 'post'
  })
}
