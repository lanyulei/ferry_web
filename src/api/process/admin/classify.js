import request from '@/utils/request'

// 创建流程分类
export function createClassify(data) {
  return request({
    url: '/api/v1/classify',
    method: 'post',
    data
  })
}

// 流程分类列表
export function classifyList(params) {
  return request({
    url: '/api/v1/classify',
    method: 'get',
    params
  })
}

// 更新流程分类
export function updateClassify(data) {
  return request({
    url: '/api/v1/classify',
    method: 'put',
    data
  })
}

// 删除流程分类
export function deleteClassify(params) {
  return request({
    url: '/api/v1/classify',
    method: 'delete',
    params
  })
}
