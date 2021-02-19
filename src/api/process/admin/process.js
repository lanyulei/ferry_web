import request from '@/utils/request'

// 创建流程
export function createProcess(data) {
  return request({
    url: '/api/v1/process',
    method: 'post',
    data
  })
}

// 流程列表
export function processList(params) {
  return request({
    url: '/api/v1/process',
    method: 'get',
    params
  })
}

// 更新流程
export function updateProcess(data) {
  return request({
    url: '/api/v1/process',
    method: 'put',
    data
  })
}

// 删除流程
export function deleteProcess(params) {
  return request({
    url: '/api/v1/process',
    method: 'delete',
    params
  })
}

// 流程详情
export function processDetails(params) {
  return request({
    url: '/api/v1/process/details',
    method: 'get',
    params
  })
}

// 分类流程列表
export function classifyProcessList(params) {
  return request({
    url: '/api/v1/process/classify',
    method: 'get',
    params
  })
}

// 克隆流程
export function cloneProcess(id) {
  return request({
    url: `/api/v1/process/clone/${id}`,
    method: 'post'
  })
}
